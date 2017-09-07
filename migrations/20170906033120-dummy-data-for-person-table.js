'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO person (email, hashed_password)
        VALUES ('notmyemail@nico.com', 'asdf'),
          ('notmyemaileither@elyse.com', 'qwerty');
    `);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM person
        where email in ('notmyemail@nico.com', 'notmyemaileither@elyse.com');
    `);
  }
};
