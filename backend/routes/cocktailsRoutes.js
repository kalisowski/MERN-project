const express = require('express');
const router = express.Router();
const {
  getCocktails,
  setCocktail,
  updateCocktail,
  deleteCocktail,
} = require('../controllers/cocktailsController');

router.route('/').get(getCocktails).post(setCocktail);
router.route('/:id').put(updateCocktail).delete(deleteCocktail);

module.exports = router;
