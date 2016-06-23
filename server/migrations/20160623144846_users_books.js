'use strict';

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_books', (table) => {
    table.increments();
    table.integer('book_id').notNullable();
    table.integer('user_id').notNullable();
    table.timestamps(true, true);
  });
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users_books');
};
