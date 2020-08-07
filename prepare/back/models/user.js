// 원래는 SQL로 만들어야하는데 Sequelize가 자바스크립트 코드로 만들어도 저절로 MYSQL에 테이블을 만들어준다.
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {// MySQL에는 users 테이블 생성. Squelize와 MySql간의 규칙 (대문자-->소문자, 단수-->복수)
    // id가 기본적으로 들어있다(MySql에서 자동적으로 만들어준 id)
    email: {
      type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, //필수
      unique: true, //고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    // 모델에대한 기본적인 세팅
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'});//사용자와 게시글의 좋아요 관계. /중간테이블 이름은 throug로 정해줄 수도 있다
    db.User.belongsToMany(db.User, {through:'Follow', as: 'Follower', foreignKey:'FollowingId'}) //foreignKey? Follower를 검색하기 위해 먼저 찾아야할 요소
    db.User.belongsToMany(db.User, {through:'Follow', as: 'Following', foreignKey:'FollowerId'})
  };
  return User;
}