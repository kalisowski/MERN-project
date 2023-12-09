const express = require('express');
const router = express.Router();
const {
  countCocktailsByCategory,
  countCommentsByCocktail,
} = require('../controllers/statsController');

router.route('/count-category').get(countCocktailsByCategory);
router.route('/count-comments').get(countCommentsByCocktail);
module.exports = router;
