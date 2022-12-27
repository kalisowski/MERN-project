const express = require('express');
const router = express.Router();
const {
  getCocktails,
  setCocktail,
  updateCocktail,
  deleteCocktail,
  findCocktail,
} = require('../controllers/cocktailsController');

router.route('/').get(getCocktails).post(setCocktail);
router
  .route('/:id')
  .get(findCocktail)
  .put(updateCocktail)
  .delete(deleteCocktail);

module.exports = router;
