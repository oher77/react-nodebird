const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

//Sequelize가 Node와 MySQL을 연결해준다. 
// config의 database, username, password 를 꺼내온다.
//config에서 정보를 가져와서 mysql2에 보내준다.
// Sequelize는 내부적으로 mysql2를 사용하고 있다. mysql2는 드라이버 역할.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//신나게 만든 모델 등록
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

// db의 Object.key인 Comment, Hashtag, Image....를 반복문 돌면서 각각의 associate 부분 실행
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;
