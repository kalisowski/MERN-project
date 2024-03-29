const express = require('express');
const router = express.Router();
const {
  newComment,
  getComments,
  deleteComment,
  updateComment,
} = require('../controllers/commentController');
const { checkCommentDelay } = require('../middleware/cookieMiddleware');

router.post('/:id', checkCommentDelay, newComment);
router.get('/:id', getComments);
router.delete('/:id/:commentId', deleteComment);
router.put('/:id/:commentId', updateComment);
module.exports = router;
