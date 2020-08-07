module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    //belongsTo가 들어가면 하단과 같이 DB table에 컬럼이 추가된다.
    //UserId: 1
    //PostId: 3
  }, {
    charset: 'utf8mb4', // 이모티콘 넣으려면 mb4 넣어줘야한다.
    collate: 'utf8mb4_general_ci', // 한글 및 이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}