const passport = require('passport');
const bcrypt = require('bcrypt');
//Strategy: LocalStrategy : 구조분해 문법. 나중에 KakaoStrategy, GoogleStrategy... 추가할 수도 있어서.
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models')
module.exports = () => {
  try { //await 처럼 비동기 요청을 보내면 서버에러가 발생할 수 있으므로 try catch로 감싼다.
    passport.use(new LocalStrategy({
      usernameField: 'email', //req.body.email
      passwordField: 'password',//req.bodky.password
    }, async (email, password, done) => {
      //로그인 전략
      const user = await User.findOne({
        where: { email } //email: email인데 ES6문법에 따라서 줄일 수 있다.
      });
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 이메일입니다' }) //done은 callback 같은 것 (서버에러, 성공, 클라이언트 에러) passport 에서는 응답을 보내주지는 않고 done을 판단해준다.
      }
      const result = await bcrypt.compare(password, user.password); //사용자가 입력한 password와 db에 저장된 passoword를 비교
      if (result) {
        return done(null, user);
      }
      return done(null, false, {reason: '비밀번호가 틀렸습니다'});
    }));
  } catch (error) {
    console.error(error);
    return done(error);
  }
  
};