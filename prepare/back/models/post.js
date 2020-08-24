module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 이모티콘 넣으려면 mb4 넣어줘야한다.
    collate: 'utf8mb4_general_ci', // 한글 및 이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    db.Post.belongsTo(db.Post, {through: 'Retweet'});
    db.Post.belongsToMany(db.User, {through: 'Like', as: 'Liker'});// 게시글과 사용자의 좋아요 관계 / as에 따라서 post.getLikers 처럼 게시글 좋아요 누른 사람을 가져올 수 있다.
  };
  return Post;
}