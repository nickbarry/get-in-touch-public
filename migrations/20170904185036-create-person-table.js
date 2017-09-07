'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE person (
        id serial PRIMARY KEY,
        email character varying(255) NOT NULL CONSTRAINT lowercase_email CHECK (email = LOWER(email)),
        hashed_password text NOT NULL,
        created_at timestamp with time zone DEFAULT NOW() NOT NULL,
        updated_at timestamp with time zone DEFAULT NOW() NOT NULL
      );
    `);
  },

  down: function (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP TABLE person;
    `);
  }
};
