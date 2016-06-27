'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

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

router.get('/', (req, res, next) => {
  knex('books').then((books) => {
      res.send(books.map(toCamelCase));
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
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
      res.send(toCamelCase(book));
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
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

  knex('books').returning('*')
    .where('id', id)
    .update(book)
    .then((updatedBook) => {
      res.send(toCamelCase(updatedBook[0]));
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
