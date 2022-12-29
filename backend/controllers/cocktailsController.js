const asyncHandler = require('express-async-handler');

const Cocktail = require('../models/cocktailModel');

const getCocktails = asyncHandler(async (req, res) => {
  const cocktails = await Cocktail.find({});
  res.status(200).json({ cocktails });
});

const setCocktail = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('No name!');
  }
  const cocktail = await Cocktail.create({
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    category: req.body.category,
    glass: req.body.glass,
  });
  res.status(200).json(cocktail);
});

const updateCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  const updatedCocktail = await Cocktail.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCocktail);
});

const deleteCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  cocktail.remove();
  res.status(200).json({ message: 'Koktajl usunięty' });
});

const findCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  console;
  res.status(200).json(cocktail);
});

const findCocktailByName = asyncHandler(async (req, res) => {
  const name = req.query.name;

  const cocktail = await Cocktail.find({ name: { $regex: name } });
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  res.status(200).json(cocktail);
});

const countAlcoholicCocktails = asyncHandler(async (req, res) => {
  const count = await Cocktail.countDocuments({ category: 'Alcoholic' });
  res.status(200).json(count);
});

const countNonAlcoholicCocktails = asyncHandler(async (req, res) => {
  const count = await Cocktail.countDocuments({ category: 'Non alcoholic' });
  res.status(200).json(count);
});

const countCocktails = asyncHandler(async (req, res) => {
  const count = await Cocktail.countDocuments();
  res.status(200).json(count);
});

module.exports = {
  getCocktails,
  setCocktail,
  updateCocktail,
  deleteCocktail,
  findCocktail,
  findCocktailByName,
  countAlcoholicCocktails,
  countNonAlcoholicCocktails,
  countCocktails,
};
