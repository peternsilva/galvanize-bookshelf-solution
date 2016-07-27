'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/authors', (_req, res, next) => {
  knex('authors')
    .orderBy('first_name')
    .orderBy('last_name')
    .then((rows) => {
      const authors = camelizeKeys(rows);

      res.send(authors);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/authors/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('authors')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const author = camelizeKeys(row);

      res.send(author);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/authors', (req, res, next) => {
  const { firstName, lastName, biography, portraitUrl } = req.body;

  if (!firstName || !firstName.trim()) {
    return next(boom.create(400, 'First name must not be blank'));
  }

  if (!lastName || !lastName.trim()) {
    return next(boom.create(400, 'Last name must not be blank'));
  }

  if (!biography || !biography.trim()) {
    return next(boom.create(400, 'Biography must not be blank'));
  }

  if (!portraitUrl || !portraitUrl.trim()) {
    return next(boom.create(400, 'Portrait must not be blank'));
  }

  const newAuthor = { firstName, lastName, biography, portraitUrl };
  const row = decamelizeKeys(newAuthor);

  knex('authors')
    .insert(row, '*')
    .then((rows) => {
      const author = camelizeKeys(rows[0]);

      res.send(author);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/authors/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  const updatedAuthor = {};

  knex('authors')
    .where('id', id)
    .first()
    .then((author) => {
      if (!author) {
        throw boom.create(404, 'Not Found');
      }

      const { firstName, lastName, biography, portraitUrl } = req.body;

      if (firstName) {
        updatedAuthor.firstName = firstName;
      }

      if (lastName) {
        updatedAuthor.lastName = lastName;
      }

      if (biography) {
        updatedAuthor.biography = biography;
      }

      if (portraitUrl) {
        updatedAuthor.portraitUrl = portraitUrl;
      }

      const row = decamelizeKeys(updatedAuthor);

      return knex('authors')
        .update(row, '*')
        .where('id', id);
    })
    .then((rows) => {
      const author = camelizeKeys(rows[0]);

      res.send(author);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/authors/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let author;

  knex('authors')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      author = camelizeKeys(row);

      return knex('authors')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete author.id;

      res.send(author);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/authors/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('authors')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      return knex('books')
        .where('author_id', id)
        .orderBy('id');
    })
    .then((rows) => {
      const books = camelizeKeys(rows);

      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
