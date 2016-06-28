'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const toCamelCase = function(book) {
  return {
    id: book.id,
    title: book.title,
    genre: book.genre,
    description: book.description,
    coverUrl: book.cover_url,
    authorId: book.author_id
  };
};

const toSnakeCase = function(book) {
  return {
    title: book.title,
    genre: book.genre,
    description: book.description,
    cover_url: book.coverUrl,
    author_id: book.authorId
  };
};

router.get('/books', (req, res, next) => {
  knex('books')
    .then((books) => {
      res.send(books.map(Case.camel));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books', (req, res, next) => {
  const book = toSnakeCase(req.body);

  if (book.title.trim() === '') {
    next(new Error('Please insert title.'));
  } else if (book.genre.trim() === '') {
    next(new Error('Please insert genre.'));
  } else if (book.description.trim() === '') {
    next(new Error('Please insert description.'));
  } else if (book.cover_url.trim() === '') {
    next(new Error('Please insert cover url.'));
  } else if (Number.isNaN(Number.parseInt(book.author_id)) || book.author_id.trim() === '') {
    next(new Error('Please insert author id as a number.'));
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

router.get('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      res.send(toCamelCase(book));
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/books/:id', (req, res, next) => {
  const book = toSnakeCase(req.body);

  if (book.title.trim() === '') {
    next(new Error('Please insert title.'));
  } else if (book.genre.trim() === '') {
    next(new Error('Please insert genre.'));
  } else if (book.description.trim() === '') {
    next(new Error('Please insert description.'));
  } else if (book.cover_url.trim() === '') {
    next(new Error('Please insert cover url.'));
  } else if (Number.isNaN(Number.parseInt(book.author_id))) {
    next(new Error('Please insert author id as a number.'));
  }

  const id = Number.parseInt(req.params.id);

  knex('books')
    .update(book, '*')
    .where('id', id)
    .then((updatedBook) => {
      res.send(toCamelCase(updatedBook[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books')
    .del()
    .where('id', id)
    .then(() => {
      res.send(`Deleted book ${id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
