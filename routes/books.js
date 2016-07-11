'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('id')
    .then((books) => {
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
  const { title, genre, description, cover_url, author_id } = req.body;

  if (!title || title.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('title must not be blank');
  }

  if (!genre || genre.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('genre must not be blank');
  }

  if (!description || description.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('description must not be blank');
  }

  if (!cover_url || cover_url.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('cover_url must not be blank');
  }

  const authorId = Number.parseInt(author_id);

  if (Number.isNaN(authorId)) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('author_id must be an integer');
  }

  knex('authors')
    .where('id', authorId)
    .first()
    .then((author) => {
      if (!author) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('author_id does not exist');
      }

      return knex('books')
        .insert({
          title,
          genre,
          description,
          cover_url,
          author_id
        }, '*')
        .then((results) => {
          res.send(results[0]);
        });
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

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next();
      }

      const bookChanges = req.body;
      const updatedBook = {};

      if (bookChanges.title) {
        updatedBook.title = bookChanges.title;
      }

      if (bookChanges.genre) {
        updatedBook.genre = bookChanges.genre;
      }

      if (bookChanges.description) {
        updatedBook.description = bookChanges.description;
      }

      if (bookChanges.cover_url) {
        updatedBook.cover_url = bookChanges.cover_url;
      }

      const authorId = Number.parseInt(bookChanges.author_id);

      if (!Number.isNaN(authorId)) {
        updatedBook.author_id = authorId;
      }

      if (bookChanges.author_id ) {
        updatedBook.author_id = bookChanges.author_id;
      }

      return knex('authors')
        .where('id', book.author_id)
        .first()
        .then((author) => {
          if (!author) {
            return res
              .status(400)
              .set('Content-Type', 'text/plain')
              .send('author_id does not exist');
          }

          return knex('books')
            .update(updatedBook, '*')
            .where('id', id)
            .then((results) => {
              res.send(results[0]);
            });
        });
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
          delete book.id;
          res.send(book);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
