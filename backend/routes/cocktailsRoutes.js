const express = require('express');
const router = express.Router();
const {
  getCocktails,
  setCocktail,
  updateCocktail,
  deleteCocktail,
  findCocktail,
  findCocktailByName,
  upload,
} = require('../controllers/cocktailsController');

router.route('/').get(getCocktails).post(upload.single('image'), setCocktail);
router
  .route('/cocktail/:id')
  .get(findCocktail)
  .put(upload.single('image'), updateCocktail)
  .delete(deleteCocktail);
router.route('/search').get(findCocktailByName);
module.exports = router;
