const express = require('express');
const router = express.Router();
const {
  newRating,
  getRating,
  clearRating,
} = require('../controllers/ratingController');
const { checkRatingDelay } = require('../middleware/cookieMiddleware');

router.post('/:id', checkRatingDelay, newRating);
router.get('/:id', getRating);
router.delete('/:id', clearRating);

module.exports = router;
