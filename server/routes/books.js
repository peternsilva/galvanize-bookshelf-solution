'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.get('/', (req, res, next) => {
  knex('books').select()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  knex('books').returning('*')
    .insert(req.body)
    .then((insertedBook) => {
      res.send(insertedBook[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  knex('books').first()
    .where('id', req.params.id)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  knex('books').returning('*')
    .where('id', req.params.id)
    .update(req.body)
    .then((updatedBook) => {
      res.send(updatedBook[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  knex('books').where('id', req.params.id)
    .del()
    .then(() => {
      res.send('Deleted user id', req.params.id);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
