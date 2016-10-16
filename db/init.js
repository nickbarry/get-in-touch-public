'use strict';

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/db.sqlite',
  },
  useNullAsDefault: true, // sqlite does not support inserting default values.
  debug: true,
});
const bookshelf = require('bookshelf')(knex);

module.exports = {
  knex,
  bookshelf,
};
