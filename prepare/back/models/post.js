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
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser 를 제공
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.hasMany(db.Comment); //post.addComments
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    db.Post.belongsTo(db.Post, {through: 'Retweet'});
    // 게시글과 사용자의 좋아요 관계 / as에 따라서 post.getLikers 처럼 게시글 좋아요 누른 사람을 가져올 수 있다.
    db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'}); // post.addLikers, post.removeLikers
  };
  return Post;
}