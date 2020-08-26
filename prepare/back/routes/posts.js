const express = require('express');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { //GET /posts
  try {
    const posts = await Post.findAll({
      limit: 10, // post를 10개만 가져와라
      //offset: 0, // offset: n - n번 게시물 부터 10개를 가져와라. 이 방법은 게시글을 지우거나 신규작성을 했을때 두번 불러오거나 불러지지 않는 게시글일 존재하게 돼서 lastID 방식을 쓴다.
      order: [ // 2차원 배열인 이유는 Associated  된 model들의 데이타들도 정렬하기 위해
        ['createdAt', 'DESC'], // DESC: 내림차순, ASC: 오름차순
        [Comment, 'createdAt', 'DESC'], //댓글 내림차순 정렬
      ], 
      //데이터를 가져올때는 필요한 데이터를 완성해서가져온다.
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;