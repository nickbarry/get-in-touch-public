const express = require('express');
const contacts = require('./controllers/contacts');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/api/contacts', contacts.fetch);
router.post('/api/contact/:contactId', contacts.update);
router.delete('/api/contact/:contactId', contacts.delete);

module.exports = router;
