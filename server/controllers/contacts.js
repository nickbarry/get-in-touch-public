const ContactsAPI = require('../../db/contacts');

const contacts = {
  fetch(req, res) {
    ContactsAPI.fetch()
      .then((fetchedContacts) => res.send(fetchedContacts));
  },
  update(req, res) {
    ContactsAPI.update(req.params.contactId, req.body)
      .then(() => res.status(204).send())
      .catch((error) => res.status(500).send({ error }));
  },
  delete(req, res) {
    ContactsAPI.delete(req.params.contactId)
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).send(err));
  },
  add(req, res) {
    ContactsAPI.add(req.body)
      .then((insertedContact) => res.send(insertedContact));
  },
};

module.exports = contacts;
