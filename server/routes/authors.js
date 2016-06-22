'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.get('/', (req, res, next) => {
  knex('authors').select()
    .then((authors) => {
      res.json(authors);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  knex('authors').insert(req.body)
    .then((author) => {
      res.json(author);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  knex('authors').select()
    .where('id', req.params.id)
    .then((author) => {
      res.json(author);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  knex('authors').where('id', req.params.id)
    .update(req.body)
    .then((author) => {
      res.json(author);
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  knex('authors').where('id', req.params.id)
    .del()
    .then((authors) => {
      res.json(authors);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
