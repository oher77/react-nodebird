const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({id: 1, contents: 'hello'});
})

module.exports = router;