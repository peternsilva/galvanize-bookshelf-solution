'use strict';

const _ = require('lodash');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((rows) => {
      const books = _.map(rows, (r) => _.mapKeys(r, (v, k) => _.camelCase(k)));

      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('books')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const book = _.mapKeys(row, (v, k) => _.camelCase(k));

      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books', (req, res, next) => {
  const { title, genre, description, coverUrl } = req.body;

  if (!title || !title.trim()) {
    return next(boom.create(400, 'Title must not be blank'));
  }

  if (!genre || !genre.trim()) {
    return next(boom.create(400, 'Genre must not be blank'));
  }

  if (!description || !description.trim()) {
    return next(boom.create(400, 'Description must not be blank'));
  }

  if (!coverUrl || !coverUrl.trim()) {
    return next(boom.create(400, 'Cover must not be blank'));
  }

  const authorId = Number.parseInt(req.body.authorId);

  if (Number.isNaN(authorId)) {
    return next(boom.create(400, 'Author must be selected'));
  }

  knex('authors')
    .where('id', authorId)
    .first()
    .then((author) => {
      if (!author) {
        throw boom.create(400, 'Author does not exist');
      }

      const book = { title, genre, description, coverUrl, authorId };
      const row = _.mapKeys(book, (v, k) => _.snakeCase(k));

      return knex('books').insert(row, '*');
    })
    .then((rows) => {
      const book = _.mapKeys(rows[0], (v, k) => _.camelCase(k));

      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  const updatedBook = {};

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        throw boom.create(404, 'Not Found');
      }

      const { title, genre, description, coverUrl } = req.body;

      if (title) {
        updatedBook.title = title;
      }

      if (genre) {
        updatedBook.genre = genre;
      }

      if (description) {
        updatedBook.description = description;
      }

      if (coverUrl) {
        updatedBook.coverUrl = coverUrl;
      }

      const authorId = Number.parseInt(req.body.authorId);

      if (!Number.isNaN(authorId)) {
        updatedBook.authorId = authorId;
      }

      return knex('authors')
        .where('id', authorId)
        .first();
    })
    .then((author) => {
      if (!author) {
        throw boom.create(400, 'Author does not exist');
      }

      const row = _.mapKeys(updatedBook, (v, k) => _.snakeCase(k));

      return knex('books')
        .update(row, '*')
        .where('id', id);
    })
    .then((rows) => {
      const book = _.mapKeys(rows[0], (v, k) => _.camelCase(k));

      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let book;

  knex('books')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      book = _.mapKeys(row, (v, k) => _.camelCase(k));

      return knex('books')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete book.id;

      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
