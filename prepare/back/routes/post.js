const express = require('express');
const { Post, Image, Comment, User } = require('../models');
const { isLoggedIn } = require('./middlewares')

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,  
    });
    const pullPost = await Post.findOne({
      where: {id: post.id},
      include: [{
        model: Image,
      },{
        model: Comment,
      },{
        model: User,
      }]
    });
    res.status(201).json(fullPost);
  }catch(error){
    console.error(error);
    next(error);
  }
});
// :postId로 하면 동적으로 들어간다. 주소에 들어가는 걸 params이라고 한다.
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    await Post.findOne({
      where: {id: req.params.postId},
    });
    if(!post) {
      return res.status(403).send('존재하지 않는 게시글입니다');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    })
    res.status(201).json(post);
  }catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;