'use strict';

const ContactsAPI = require('../../db/contacts');

const contacts = {
  fetch: function(req, res) {
    ContactsAPI.fetch().then(contacts => {
      //console.log('Server is about to send these contacts: ', contacts);
      res.send(contacts)
    });
  },
  delete: function(req, res) {
    ContactsAPI.delete(req.params.userId)
      .then(model => {
        res.status(204).send();
      })
      .catch(err => res.status(400).send(err));
  },
};

module.exports = contacts;
