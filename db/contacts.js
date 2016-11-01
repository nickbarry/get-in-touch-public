'use strict'; // eslint-disable-line strict

const db = require('./init');
const knex = db.knex;
const bookshelf = db.bookshelf;
const validation = require('../server/utils/validation');

const contactsColumns = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  facebook: 'facebook',
  twitter: 'twitter',
  lastContacted: 'lastContacted',
  contactFrequency: 'contactFrequency',
  contactNext: 'contactNext',
  notes: 'notes',
};

// Contacts table schema
knex.schema.createTableIfNotExists('contacts', (table) => {
  table.increments(contactsColumns.id).primary();
  table.string(contactsColumns.name);
  table.string(contactsColumns.email);
  table.string(contactsColumns.phone);
  table.string(contactsColumns.facebook);
  table.string(contactsColumns.twitter);
  table.string(contactsColumns.lastContacted);
  table.string(contactsColumns.contactFrequency);
  table.string(contactsColumns.contactNext);
  table.string(contactsColumns.notes);
  table.timestamps();
}).then(() => (undefined)); // We need to call .then to create the table, but don't need
// to actually do anything in the callback.

function findImproperKeys(columns, keyValues, noId) {
  const keys = Object.keys(keyValues);
  const improperKeys = [];
  for (let i = 0; i < keys.length; i += 1) {
    const keyNotFoundInColumns = columns[keys[i]] === undefined;
    const improperUseOfId = keys[i] === 'id';
    if (keyNotFoundInColumns || (noId && improperUseOfId)) {
      improperKeys.push(keys[i]);
    }
  }
  return improperKeys;
}

const validateContactUpdateInputs = (values, validationFunctions) => (
  [
    validationFunctions.contactName(values.name),
    validationFunctions.contactEmail(values.email),
    validationFunctions.contactPhone(values.phone),
    validationFunctions.contactLastContacted(values.lastContacted),
    validationFunctions.contactContactFrequency(values.contactFrequency),
  ].filter((el) => el).join('. ') || null
);

// Contacts model
const ContactModel = bookshelf.Model.extend({
  tableName: 'contacts',
  hasTimestamps: true,
});

// Contacts API
const ContactsAPI = {
  fetch() {
    return ContactModel.fetchAll()
      .then((contacts) => contacts.toJSON());
  },
  update(contactId, values) {
    const improperKeys = findImproperKeys(contactsColumns, values, true);
    if (improperKeys.length) {
      return {
        getInTouchError: `Error: Keys do not match column names. Improper key(s): ${improperKeys.join(', ')}`,
      };
    }

    const validationErrors = validateContactUpdateInputs(values, validation);
    if (validationErrors) {
      return {
        getInTouchError: `Error: Validation errors. ${validationErrors}`,
      };
    }

    return ContactModel.forge({ id: contactId })
      .save(values, {
        method: 'update',
        patch: true,
        require: true,
      });
  },
  delete(userId) {
    return (new ContactModel({ id: userId })).destroy();
  },
  add(newContact) {
    return (new ContactModel(newContact)).save();
  },
};

module.exports = ContactsAPI;
