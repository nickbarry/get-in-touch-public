const knex = require('../init').knex;

const contactsColumns = {
  id: 'id',
  userId: 'userId',
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

const usersColumns = {
  id: 'id',
  username: 'username',
  fullName: 'fullName',
  email: 'email',
  password: 'password',
};

// Users table/schema
knex.schema.createTableIfNotExists('users', (table) => {
  table.increments(usersColumns.id).primary();
  table.string(usersColumns.fullName);
  table.string(usersColumns.email);
  table.string(usersColumns.password);
  table.timestamps();
}).then(() => (undefined)); // We need to call .then to create the table, but don't need
// to actually do anything in the callback.

// Contacts table/schema
knex.schema.createTableIfNotExists('contacts', (table) => {
  table.increments(contactsColumns.id).primary();
  table.string(contactsColumns.userId).references('users.id');
  table.string(contactsColumns.name);
  table.string(contactsColumns.email);
  table.string(contactsColumns.phone);
  table.string(contactsColumns.facebook);
  table.string(contactsColumns.twitter);
  table.string(contactsColumns.lastContacted);
  table.string(contactsColumns.contactFrequency);
  table.string(contactsColumns.notes);
  table.timestamps();
}).then(() => (undefined)); // We need to call .then to create the table, but don't need
// to actually do anything in the callback.

