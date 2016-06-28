'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/authors', (_req, res, next) => {
  knex('authors')
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
  const newAuthor = req.body;

  if (!newAuthor.first_name || newAuthor.first_name.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('first_name must not be blank');
  }

  if (!newAuthor.last_name || newAuthor.last_name.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('last_name must not be blank');
  }

  if (!newAuthor.biography || newAuthor.biography.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('biography must not be blank');
  }

  if (!newAuthor.portrait_url || newAuthor.portrait_url.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('portrait_url must not be blank');
  }

  knex('authors')
    .insert(author, '*')
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/authors/:id', (req, res, next) => {
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

      const newAuthor = req.body;

      if (!newAuthor.first_name || newAuthor.first_name.trim() === '') {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('first_name must not be blank');
      }

      if (!newAuthor.last_name || newAuthor.last_name.trim() === '') {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('last_name must not be blank');
      }

      if (!newAuthor.biography || newAuthor.biography.trim() === '') {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('biography must not be blank');
      }

      if (!newAuthor.portrait_url || newAuthor.portrait_url.trim() === '') {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('portrait_url must not be blank');
      }

      knex('authors')
        .update(author, '*')
        .where('id', id)
        .then((results) => {
          res.send(results[0]);
        })
        .catch((err) => {
          next(err);
        });
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

      return knex('author')
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
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
