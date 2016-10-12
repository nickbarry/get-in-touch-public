const express = require('express');
const contacts = require('./controllers/contacts');

const router = express.Router();

router.get('/api/contacts', contacts.fetch);

module.exports = router;
