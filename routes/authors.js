'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/authors', (_req, res, next) => {
  knex('authors')
    .orderBy('id')
    .then((authors) => {
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
    .then((author) => {
      if (!author) {
        return next();
      }

      res.send(author);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/authors', (req, res, next) => {
  const { first_name, last_name, biography, portrait_url } = req.body;

  if (!first_name || first_name.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('first_name must not be blank');
  }

  if (!last_name || last_name.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('last_name must not be blank');
  }

  if (!biography || biography.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('biography must not be blank');
  }

  if (!portrait_url || portrait_url.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('portrait_url must not be blank');
  }

  knex('authors')
    .insert({
      first_name,
      last_name,
      biography,
      portrait_url
    }, '*')
    .then((results) => {
      res.send(results[0]);
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

  knex('authors')
    .where('id', id)
    .first()
    .then((author) => {
      if (!author) {
        return next();
      }

      const authorChanges = req.body;
      const updatedAuthor = {};

      if (authorChanges.first_name) {
        updatedAuthor.first_name = authorChanges.first_name;
      }

      if (authorChanges.last_name) {
        updatedAuthor.last_name = authorChanges.last_name;
      }

      if (authorChanges.biography) {
        updatedAuthor.biography = authorChanges.biography;
      }

      if (authorChanges.portrait_url) {
        updatedAuthor.portrait_url = authorChanges.portrait_url;
      }

      return knex('authors')
        .update(updatedAuthor, '*')
        .where('id', id)
        .then((results) => {
          res.send(results[0]);
        });
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

  knex('authors')
    .where('id', id)
    .first()
    .then((author) => {
      if (!author) {
        return next();
      }

      return knex('authors')
        .del()
        .where('id', id)
        .then(() => {
          delete author.id;
          res.send(author);
        });
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
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
