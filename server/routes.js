const express = require('express');
const contacts = require('./controllers/contacts');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/api/contacts', contacts.fetch);
router.delete('/api/contact/:userId', contacts.delete);

module.exports = router;
