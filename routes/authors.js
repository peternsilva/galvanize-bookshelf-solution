'use strict';

const _ = require('lodash');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/authors', (_req, res, next) => {
  knex('authors')
    .orderBy('first_name')
    .orderBy('last_name')
    .then((rows) => {
      const authrs = _.map(rows, (r) => _.mapKeys(r, (v, k) => _.camelCase(k)));

      res.send(authrs);
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

      const author = _.mapKeys(row, (v, k) => _.camelCase(k));

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

  const author = { firstName, lastName, biography, portraitUrl };
  const row = _.mapKeys(author, (v, k) => _.snakeCase(k));

  knex('authors')
    .insert(row, '*')
    .then((rows) => {
      const author = _.mapKeys(rows[0], (v, k) => _.camelCase(k));

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

      const row = _.mapKeys(updatedAuthor, (v, k) => _.snakeCase(k));

      return knex('authors')
        .update(row, '*')
        .where('id', id);
    })
    .then((rows) => {
      const author = _.mapKeys(rows[0], (v, k) => _.camelCase(k));

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

      author = _.mapKeys(row, (v, k) => _.camelCase(k));;

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

  knex('books')
    .where('author_id', id)
    .orderBy('id')
    .then((rows) => {
      const books = _.map(rows, (r) => _.mapKeys(r, (v, k) => _.camelCase(k)));

      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
