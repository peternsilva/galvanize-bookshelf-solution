'use strict';

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('genre').notNullable();
    table.text('description').notNullable();
    table.text('cover_url').notNullable();
    table.integer('authors_id')
      .notNullable()
      .references('id')
      .inTable('authors')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable('books');
};
