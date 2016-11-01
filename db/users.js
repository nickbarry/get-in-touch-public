'use strict'; // eslint-disable-line strict

const { knex, bookshelf } = require('./init');

const usersColumns = {
  id: 'id',
  username: 'username',
  fullName: 'fullName',
  email: 'email',
  password: 'password',
};

// Users table schema
knex.schema.createTableIfNotExists('users', (table) => {
  table.increments(usersColumns.id).primary();
  table.string(usersColumns.username);
  table.string(usersColumns.fullName);
  table.string(usersColumns.email);
  table.string(usersColumns.password);
  table.timestamps();
}).then(() => (undefined)); // We need to call .then to create the table, but don't need
// to actually do anything in the callback.

// Users model
const UserModel = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
});

// Users API
module.exports = {
  checkPassword(email, password) {

  },
  add(email, password) {

  },
};
