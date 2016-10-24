const ContactsAPI = require('../../db/contacts');

const contacts = {
  fetch(req, res) {
    ContactsAPI.fetch().then((fetchedContacts) => {
      res.send(fetchedContacts);
    });
  },
  update(req, res) {
    const response = ContactsAPI.update(req.params.contactId, req.body);
    if (response.error) {
      res.status(400).send(response);
    } else {
      response.then(() => res.status(204).send())
        .catch((error) => res.status(500).send({ error }));
    }
  },
  delete(req, res) {
    ContactsAPI.delete(req.params.contactId)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => res.status(400).send(err));
  },
};

module.exports = contacts;
