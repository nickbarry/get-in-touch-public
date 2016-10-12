const contactsModel = require('../../db/contacts');

const contacts = {
  fetch: function(req, res) {
    contactsModel.fetch().then(contacts => res.send(contacts));
  }
};

module.exports = contacts;
