const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add ingredients'],
    validate: [(value) => value.length > 0, 'No ingredients provided'],
  },
  instructions: {
    type: [String],
    required: [true, 'Please add instructions'],
    validate: [(value) => value.length > 0, 'No instructions provided'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  glass: {
    type: String,
    required: [true, 'Please add a glass'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image'],
  },
  comments: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        text: {
          type: String,
          required: [true, 'Please add a comment'],
        },
        author: {
          type: String,
          required: [true, 'Please add an author of the comment'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingsAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Cocktail', cocktailSchema);
