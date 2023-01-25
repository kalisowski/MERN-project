const express = require('express');
const router = express.Router();
const {
  countCocktailsByCategory,
  countCommentsByCocktail,
  stat,
  recentComments,
} = require('../controllers/statsController');

router.route('/').get(stat);
router.route('/count-category').get(countCocktailsByCategory);
router.route('/count-comments').get(countCommentsByCocktail);
router.route('/recent-comments').get(recentComments);
module.exports = router;
