const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/db.sqlite',
  },
  useNullAsDefault: true, // sqlite does not support inserting default values.
  debug: true,
});
const bookshelf = require('bookshelf')(knex);

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

module.exports = {
  bookshelf,
  contactsColumns,
  knex,
  usersColumns,
};
