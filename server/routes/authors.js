'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.get('/', (req, res, next) => {
  knex('authors').select()
    .then((authors) => {
      res.send(authors);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  knex('authors').returning('*')
    .insert(req.body)
    .then((insertedAuthors) => {
      res.send(insertedAuthors[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('authors').first()
    .where('id', id)
    .then((author) => {
      res.send(author);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books')
    .where('author_id', id)
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('authors').where('id', id)
    .update(req.body)
    .then((updatedAuthors) => {
      res.send(updatedAuthors[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id);

  knex('authors').returning('*')
    .where('id', id)
    .del()
    .then(() => {
      res.send(`Successfully deleted ${id}`);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
