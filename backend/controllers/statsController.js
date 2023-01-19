const asyncHandler = require('express-async-handler');
const Cocktail = require('../models/cocktailModel');

const countCocktailsByCategory = asyncHandler(async (req, res) => {
  const counts = await Cocktail.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1, _id: 1 },
    },
    {
      $group: {
        _id: 'cocktails',
        total: { $sum: '$count' },
        categories: { $push: { category: '$_id', count: '$count' } },
      },
    },
  ]);
  res.status(200).json(counts);
});

const countCommentsByCocktail = asyncHandler(async (req, res) => {
  const totalComments = await Cocktail.aggregate([
    {
      $unwind: '$comments',
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const commentsByCocktail = await Cocktail.aggregate([
    {
      $unwind: '$comments',
    },
    {
      $group: {
        _id: '$name',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1, _id: 1 },
    },
  ]);

  res.status(200).json({ totalComments, commentsByCocktail });
});

module.exports = {
  countCocktailsByCategory,
  countCommentsByCocktail,
};
