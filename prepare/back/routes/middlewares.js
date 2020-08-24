exports.isLoggedIn = (req, res, next) => {
  //isAuthenticated : passport에서 제공. 로그인을 했는지 안 했는지 판별. req.user 로 할 수도 있다.
  if(req.isAuthenticated()) {
    // next()의 두가지 사용방법 () 안에 뭘 넣으면 에러를 처리하러가고, 안 넣으면 다음 미들웨어로 간다.
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
}
exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
}