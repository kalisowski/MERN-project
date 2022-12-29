const express = require('express');
const router = express.Router();
const {
  getCocktails,
  setCocktail,
  updateCocktail,
  deleteCocktail,
  findCocktail,
  findCocktailByName,
  countAlcoholicCocktails,
  countNonAlcoholicCocktails,
  countCocktails,
} = require('../controllers/cocktailsController');

router.route('/').get(getCocktails).post(setCocktail);
router
  .route('/cocktail/:id')
  .get(findCocktail)
  .put(updateCocktail)
  .delete(deleteCocktail);
router.route('/count').get(countCocktails);
router.route('/count-alcoholic').get(countAlcoholicCocktails);
router.route('/count-non-alcoholic').get(countNonAlcoholicCocktails);
router.route('/search').get(findCocktailByName);

module.exports = router;
