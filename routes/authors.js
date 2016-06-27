'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

const bookToCamelCase = function(book) {
  return {
    id: book.id,
    title: book.title,
    genre: book.genre,
    description: book.description,
    coverUrl: book.cover_url,
    authorId: book.author_id
  };
};

const toCamelCase = function(author) {
  return {
    id: author.id,
    firstName: author.first_name,
    lastName: author.last_name,
    biography: author.biography,
    portraitUrl: author.portrait_url
  };
};

const toSnakeCase = function(author) {
  return {
    first_name: author.firstName,
    last_name: author.lastName,
    biography: author.biography,
    portrait_url: author.portraitUrl
  };
};

router.get('/', (req, res, next) => {
  knex('authors').then((authors) => {
      res.send(authors.map(toCamelCase));
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  let author = toSnakeCase(req.body);

  if (author.first_name.trim() === '') {
    next(new Error('Please insert first name.'));
  } else if (author.last_name.trim() === '') {
    next(new Error('Please insert last name.'));
  } else if (author.biography.trim() === '') {
    next(new Error('Please insert biography.'));
  } else if (author.portrait_url.trim() === '') {
    next(new Error('Please insert portrait url.'));
  }

  knex('authors').returning('*')
    .insert(author)
    .then((insertedAuthors) => {
      res.send(toCamelCase(insertedAuthors[0]));
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('authors').first()
    .where('id', id)
    .then((author) => {
      res.send(toCamelCase(author));
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books').where('author_id', id)
    .then((books) => {
      res.send(books.map(bookToCamelCase));
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  let author = toSnakeCase(req.body);

  if (author.first_name.trim() === '') {
    next(new Error('Please insert first name.'));
  } else if (author.last_name.trim() === '') {
    next(new Error('Please insert last name.'));
  } else if (author.biography.trim() === '') {
    next(new Error('Please insert biography.'));
  } else if (author.portrait_url.trim() === '') {
    next(new Error('Please insert portrait url.'));
  }

  const id = Number.parseInt(req.params.id);

  knex('authors').where('id', id)
    .returning('*')
    .update(author)
    .then((updatedAuthors) => {
      res.send(toCamelCase(updatedAuthors[0]));
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('authors').where('id', id)
    .del()
    .then(() => {
      res.send(`Successfully deleted ${id}`);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
