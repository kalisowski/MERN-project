const asyncHandler = require('express-async-handler');

const Cocktail = require('../models/cocktailModel');

const newRating = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  if (!req.body.rating) {
    res.status(400);
    throw new Error('Nie podano oceny');
  }
  if (req.body.rating < 1 || req.body.rating > 5) {
    res.status(400);
    throw new Error('Ocena musi być z zakresu 1-5');
  }
  rating = parseInt(req.body.rating);
  if (isNaN(rating)) {
    res.status(400);
    throw new Error('Ocena musi być liczbą');
  }
  cocktail.ratingsAmount += 1;
  cocktail.rating =
    (cocktail.rating * (cocktail.ratingsAmount - 1) + rating) /
    cocktail.ratingsAmount;
  await cocktail.save();
  res.json({ rating: cocktail.rating, ratingsAmount: cocktail.ratingsAmount });
});

const getRating = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  res.json(cocktail.rating);
});

const clearRating = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  cocktail.ratingsAmount = 0;
  cocktail.rating = 0;
  await cocktail.save();
  res.json({ rating: cocktail.rating, ratingsAmount: cocktail.ratingsAmount });
});

module.exports = {
  newRating,
  getRating,
  clearRating,
};
