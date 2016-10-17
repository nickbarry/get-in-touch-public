const ContactsAPI = require('../../db/contacts');

const contacts = {
  fetch(req, res) {
    ContactsAPI.fetch().then((fetchedContacts) => {
      res.send(fetchedContacts);
    });
  },
  delete(req, res) {
    ContactsAPI.delete(req.params.userId)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => res.status(400).send(err));
  },
};

module.exports = contacts;
