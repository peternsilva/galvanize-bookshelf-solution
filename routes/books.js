'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/books', (req, res, next) => {
  knex('books')
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next();
      }

      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books', (req, res, next) => {
  const book = req.body;

  if (!book.title || book.title.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('title must not be blank');
  }

  if (!book.genre || book.genre.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('genre must not be blank');
  }

  if (!book.description || book.description.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('description must not be blank');
  }

  if (!book.cover_url || book.cover_url.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('cover_url must not be blank');
  }

  if (Number.isNaN(Number.parseInt(book.author_id))) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('author_id must be an integer');
  }

  knex('books')
    .insert(book, '*')
    .then((insertedBook) => {
      res.send(insertedBook[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/books/:id', (req, res, next) => {
  const book = req.body;

  if (!book.title || book.title.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('title must not be blank');
  }

  if (!book.genre || book.genre.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('genre must not be blank');
  }

  if (!book.description || book.description.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('description must not be blank');
  }

  if (!book.cover_url || book.cover_url.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('cover_url must not be blank');
  }

  if (Number.isNaN(Number.parseInt(book.author_id))) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('author_id must be an integer');
  }

  const id = Number.parseInt(req.params.id);

  knex('books')
    .update(book, '*')
    .where('id', id)
    .then((updatedBook) => {
      if (!updatedBook[0]) {
        return next();
      }

      res.send(updatedBook[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next();
      }

      return knex('books')
        .del()
        .where('id', id)
        .then(() => {
          res.send(book);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
