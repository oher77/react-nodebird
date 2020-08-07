module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 이모티콘 넣으려면 mb4 넣어줘야한다.
    collate: 'utf8mb4_general_ci', // 한글 및 이모티콘 저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashTag' });
  };
  return Hashtag;
}