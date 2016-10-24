const express = require('express');
const contacts = require('./controllers/contacts');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router(); // eslint-disable-line new-cap

router.get('/api/contacts', contacts.fetch);
router.delete('/api/contact/:userId', contacts.delete);
router.post('/api/contact', jsonParser, (req, res) => {
  contacts.add(req, res, req.body);
});

module.exports = router;
