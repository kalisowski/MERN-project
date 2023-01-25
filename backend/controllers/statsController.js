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

const recentComments = asyncHandler(async (req, res) => {
  const comments = await Cocktail.aggregate([
    {
      $unwind: '$comments',
    },
    {
      $sort: { 'comments.createdAt': -1 },
    },
    {
      $group: {
        _id: '$_id',
        CocktailName: { $first: '$name' },
        recentComment: { $first: '$comments' },
      },
    },
    {
      $project: {
        _id: 0,
        CocktailName: 1,
        'recentComment.text': 1,
        'recentComment.author': 1,
        'recentComment.createdAt': 1,
      },
    },
    { $sort: { 'recentComment.createdAt': -1 } },
  ]);
  res.status(200).json(comments);
});

const stat = asyncHandler(async (req, res) => {
  const stats = await Cocktail.aggregate([
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
  res.status(200).json(stats);
});

module.exports = {
  countCocktailsByCategory,
  countCommentsByCocktail,
  stat,
  recentComments,
};
