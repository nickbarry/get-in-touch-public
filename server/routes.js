const express = require('express');
const contacts = require('./controllers/contacts');

const router = express.Router();

const methodUrlLogger = (req, res, next) => {
  console.log(`${req.method} for ${req.url}`);
  next();
};

router.get('/api/contacts', contacts.fetch);

module.exports = router;
