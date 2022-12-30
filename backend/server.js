const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/cocktails', require('./routes/cocktailsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/comments', require('./routes/commentsRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
