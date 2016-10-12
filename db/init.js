'use strict';

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/db.sqlite',
  },
  useNullAsDefault: true, // sqlite does not support inserting default values.
});
const bookshelf = require('bookshelf')(knex);
const moment = require('moment');

module.exports = {
  knex,
  bookshelf,
};
