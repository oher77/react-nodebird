const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// 중복되는 url 라우터 분리
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const db = require('./models');
const passportConfig = require('./passport');
const passport = require('passport');
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공!!!');
  })
  .catch(console.error);

passportConfig();
// const server = http.createServer((req,res) => {
//   console.log(req.url, req.method);
//   res.write('<h1>helskjse</h1>');
//   res.end('Hello node');
// });

//위에서 부터 아래로 실행되기 때문에 미들웨어의 순서는 라우터들 위에 써준다.
app.use(cors({
  origin: '*', // 추후에는 도메인 주소로 변경. 일단은 개발 단계에서는 개발 서버요청을 받아야하니까 *로..
  credentials: false, //false가 기본값.
}));
app.use(express.json()); //json 형식의 데이터를 해석해서 req.body안에 넣어준다
app.use(express.urlencoded({ express: true })); //form submit 된 데이터를 해석해서 req.body 안에 넣어준다.
//세션을 사용하기위해 다음과 같은 미들웨어 장착
app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
})
// 중복되는 url 라우터 분리
// '/post'가 prefix가 된다.
app.use('/post', postRouter);
//url별로 라우터를 생성한다.
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버실행!');
});