const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Hello from Vercel Express API!');
});

module.exports = app;