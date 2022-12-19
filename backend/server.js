const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.get('/api/cocktails', (req, res) => {
  res.json({ msg: 'Tu beda koktajle' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
