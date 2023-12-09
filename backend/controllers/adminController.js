const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');

const registerAdmin = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400);
    throw new Error('Please provide login and password');
  }

  const adminExists = await Admin.findOne({ login });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    login,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      login: admin.login,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const admin = await Admin.findOne({ login });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      login: admin.login,
      token: generateToken(admin.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid login or password');
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const getAdminProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});

module.exports = { loginAdmin, registerAdmin, getAdminProfile };
