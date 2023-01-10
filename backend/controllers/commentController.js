const asyncHandler = require('express-async-handler');

const Cocktail = require('../models/cocktailModel');

const newComment = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  if (!req.body.text || !req.body.author) {
    res.status(400);
    throw new Error('Nie podano wszystkich danych');
  }
  cocktail.comments.push({
    text: req.body.text,
    author: req.body.author,
  });

  cocktail.save((error) => {
    if (error) {
      res.status(400);
      console.log(error);
      throw new Error('Nie udało się dodać komentarza', error);
    }
  });
  res.status(200).json(cocktail.comments);
});

const getComments = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  res.status(200).json(cocktail.comments);
});

const deleteComment = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  const comment = cocktail.comments.find(
    (comment) => comment._id == req.params.commentId
  );
  if (!comment) {
    res.status(404);
    throw new Error('Nie ma takiego komentarza');
  }
  cocktail.comments = cocktail.comments.filter(
    (comment) => comment._id != req.params.commentId
  );
  cocktail.save((error) => {
    if (error) {
      res.status(400);
      console.log(error);
      throw new Error('Nie udało się usunąć komentarza', error);
    }
  });
  res.status(200).json(cocktail.comments);
});

const updateComment = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  const comment = cocktail.comments.find(
    (comment) => comment._id == req.params.commentId
  );
  if (!comment) {
    res.status(404);
    throw new Error('Nie ma takiego komentarza');
  }
  if (!req.body.text || !req.body.author) {
    res.status(400);
    throw new Error('Nie podano wszystkich danych');
  }
  cocktail.comments = cocktail.comments.map((comment) => {
    if (comment._id == req.params.commentId) {
      comment.text = req.body.text;
      comment.author = req.body.author;
    }
    return comment;
  });
  cocktail.save((error) => {
    if (error) {
      res.status(400);
      console.log(error);
      throw new Error('Nie udało się zaktualizować komentarza', error);
    }
  });
  res.status(200).json(cocktail.comments);
});

module.exports = {
  newComment,
  getComments,
  deleteComment,
  updateComment,
};
