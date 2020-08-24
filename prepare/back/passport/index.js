const passport = require('passport');
const local = require('./local');
const {User} = require('../models');

module.exports = () => {
  //user 정보를 세션에 다 들고있기 무거우니까 user.id만 따로저장
  passport.serializeUser((user, done) => { // user: 라우터의 req.login(user, 가 일루 들어감
    done(null, user.id); // done(서버에러, 성공)

  });
  // user.id를 통해서 db에서 user 정보 복원
  passport.deserializeUser(async (id, done) => {
    try{
      const user = await User.findOne({ where: {id}});
      done(null, user);
    }catch (error) {
      console.error(error);
      done(error);

    }
  });
  local();
}