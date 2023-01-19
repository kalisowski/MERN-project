const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Cocktail = require('../models/cocktailModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const getCocktails = asyncHandler(async (req, res) => {
  const cocktails = await Cocktail.find({}).sort({ name: 1 });
  res.status(200).json({ cocktails });
});

const setCocktail = asyncHandler(async (req, res) => {
  const existingCocktail = await Cocktail.findOne({ name: req.body.name });
  if (existingCocktail) {
    const fileName = path.basename(req.file.filename);
    fs.unlink(path.join(__dirname, '../uploads', fileName), (err) => {
      if (err) {
        console.error(err);
      }
    });
    return res
      .status(409)
      .json({ msg: 'Cocktail with the same name already exists' });
  } else {
    const cocktail = await Cocktail.create({
      name: req.body.name,
      image:
        req.protocol +
        '://' +
        req.get('host') +
        '/uploads/' +
        req.file.filename,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      category: req.body.category,
      glass: req.body.glass,
    });
    res.status(201).json(cocktail);
  }
});

const updateCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }

  cocktail.name = req.body.name;
  if (req.file) {
    const fileName = path.basename(cocktail.image);
    fs.unlink(path.join(__dirname, '../uploads', fileName), (err) => {
      if (err) {
        console.error(err);
      }
    });
    cocktail.image =
      req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
  } else cocktail.image = cocktail.image;
  cocktail.ingredients = req.body.ingredients;
  cocktail.instructions = req.body.instructions;
  cocktail.category = req.body.category;
  cocktail.glass = req.body.glass;
  const updatedCocktail = await cocktail.save();
  res.status(200).json(updatedCocktail);
});

const deleteCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  const fileName = path.basename(cocktail.image);
  fs.unlink(path.join(__dirname, '../uploads', fileName), (err) => {
    if (err) {
      console.error(err);
    }
  });
  cocktail.remove();
  res.status(200).json({ message: 'Koktajl usunięty' });
});

const findCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  res.status(200).json(cocktail);
});

const findCocktailByName = asyncHandler(async (req, res) => {
  const name = req.query.name;

  const cocktail = await Cocktail.find({
    name: { $regex: name, $options: 'i' },
  }).sort({
    name: 1,
  });
  if (!cocktail) {
    res.status(404);
    throw new Error('Nie ma takiego koktajlu');
  }
  res.status(200).json(cocktail);
});

module.exports = {
  getCocktails,
  setCocktail,
  updateCocktail,
  deleteCocktail,
  findCocktail,
  findCocktailByName,
  upload,
};
