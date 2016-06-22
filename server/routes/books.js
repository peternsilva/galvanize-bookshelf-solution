'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.get('/', (req, res, next) => {
  knex('books').select()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  knex('books').insert(req.body)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  knex('books').select()
    .where('id', req.params.id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  knex('books').where('id', req.params.id)
    .update(req.body)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  knex('books').where('id', req.params.id)
    .del()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
