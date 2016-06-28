'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

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

router.get('/authors', (req, res, next) => {
  knex('authors')
    .then((authors) => {
      res.send(authors.map(toCamelCase));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/authors', (req, res, next) => {
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

  knex('authors')
    .insert(author, '*')
    .then((insertedAuthors) => {
      res.send(toCamelCase(insertedAuthors[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/authors/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('authors')
    .where('id', id)
    .first()
    .then((author) => {
      res.send(toCamelCase(author));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/authors/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books')
    .where('author_id', id)
    .then((books) => {
      res.send(books.map(bookToCamelCase));
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/authors/:id', (req, res, next) => {
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

  knex('authors')
    .update(author, '*')
    .where('id', id)
    .then((updatedAuthors) => {
      res.send(toCamelCase(updatedAuthors[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/authors/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('authors')
    .del()
    .where('id', id)
    .then(() => {
      res.send(`Successfully deleted ${id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
