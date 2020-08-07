const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); //models/index.js 에서 구조분해 할당. db에 등록된  User테이블을 가져와야하므로...
const passport = require('passport');
const router = express.Router();

//User.create로 테이블에 데이터를 넣는다.
//awqit을 쓰려면  async를 써야한다.
//async await 를 통해 흐름의 순서를 맞춰준다. 비동기..
//res.send  가 먼저 진행돼 버리면 곤란...
// 프론드에서 axios.post를 통해 보낸 데이터를 req.body로 받는다
//req.body를 사용하려면 app.js에서 app.use(express...)로 가져와야한다.
router.post('/login', (req, res, next) => {// 미들웨어 확장 법 (req, res, next)=>{}안에 넣어준다. express의 기법중 하나.
  passport.authenticate('local', (error, user, info)=> {
    if(error) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(403).send(info.reason);
    }
    // passport 에서 로그인을 할 수 있도록 허락. 
    return req.login(user, async (loginErr) => {
      if(loginErr) { //혹시라도 에러가 발생할 수 있어서 (살면서 본적 없음)
        console.error(loginErr);
        return next(loginErr);
      }
      // 마지막으로 passport 로그인까지 끝나면 user에서 사용자정보를 프론트로 넘겨줌...
      return res.status(200).json(user);

    })(req, res, next);
  });
});

router.post('/', async(req, res, next) => { //POST /user/
  try{
    // 중복체크
    const exUser = await User.findOne({ // 비동기 이므로 await : 공식문서를 보고 비동기 인지 아닌지 찾아봐야한다.
      where: {
        email: req.body.email,
      }
    });
    if (exUser){//exUser가 있다면
      return res.status(403).send('이미 사용중인 아이디입니다.') //return 을 안 보내면 계속 진행되며 응답을 두 번 보내게 된다.
    }
    // bcrypt도 비동기라 await을 붙여줘야한다.
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //10~13 정도 넣는다.
    await User.create({
      email:req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send('ok'); 
  }catch{
    console.error(error);
    next(error); //status 500
  }
})

module.exports = router;