'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.get('/', (req, res, next) => {
  knex('books').then((books) => {
      res.send(books);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  const book = {
    title: req.body.title.trim(),
    genre: req.body.genre.trim(),
    description: req.body.description.trim(),
    cover_url: req.body.coverUrl.trim(),
    author_id: req.body.authorId
  };

  knex('books').returning('*')
    .insert(book)
    .then((insertedBook) => {
      res.send(insertedBook[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books').first()
    .where('id', id)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books').returning('*')
    .where('id', id)
    .update(req.body)
    .then((updatedBook) => {
      res.send(updatedBook[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books').where('id', id)
    .del()
    .then(() => {
      res.send(`Deleted book ${id}`);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
