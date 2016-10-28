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
  ].filter(el => el).join('. ') || null
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

// <editor-fold desc="Add dummy data to db">
// const dummyContactData = [
//  {
//    name: 'Elyse Greenarry',
//    // id: 1,
//    lastContacted: new moment("2016-07-01").hours(0).minutes(0).seconds(0).milliseconds(0),
//    contactFrequency: 1,
//    contactNext: new moment("2016-07-02"),
//    notes: 'Talk to her about my cool MVP.\n\nMarried on 5/14/16.\nBirthday 6/14/88',
//  },
//  {
//    name: 'Chris Brenton',
//    // id: 2,
//    lastContacted: new moment("2016-06-30"),
//    contactFrequency: 14,
//    contactNext: new moment("2016-07-13"),
//    notes: "Python coder. Started the High Impact dodgeball league. Works a lot on improving/automating people's " +
//    "workflows, e.g. deployment workflows.",
//  },
//  {
//    name: 'Catrina Fuentes',
//    // id: 3,
//    lastContacted: new moment("2015-02-20"),
//    contactFrequency: 180,
//    contactNext: new moment("2016-10-20"),
//    notes: 'Recently (1/2015) started working at a cool company doing social media work for nonprofits.' +
//    '\n\nInterned for me at Davis Dollars',
//  },
//  {
//    name: 'Nick Winter',
//    // id: 4,
//    lastContacted: new moment("2015-01-30"),
//    contactFrequency: 365,
//    contactNext: new moment("2016-01-30"),
//    notes: "Met through Cassie Winter, Nick's cousin. Nick started Code Combat, and now it mostly runs itself.",
//  },
//  {
//    name: 'Reed Cureton',
//    // id: 5,
//    lastContacted: new moment("2016-10-10").hours(0).minutes(0).seconds(0).milliseconds(0),
//    contactFrequency: 3,
//    contactNext: (new moment("2016-10-10")).add(3, 'days'),
//    notes: 'Get him to tell more funny jokes. Thank him for being a kick-ass fellow.',
//  },
// ];
//
// dummyContactData.forEach(c => {
//  const contact = new ContactModel();
//  contact.set('name', c.name);
//  contact.set('contactFrequency', c.contactFrequency);
//  contact.set('contactNext', c.contactNext.format());
//  contact.set('lastContacted', c.lastContacted.format());
//  contact.set('notes', c.notes);
//
//  contact.save()
//    .then(u => console.log('User saved: ', `${u.get('id')} ${u.get('name')}`))
//    .catch(e => console.log(e));
// });
// </editor-fold>

module.exports = ContactsAPI;
