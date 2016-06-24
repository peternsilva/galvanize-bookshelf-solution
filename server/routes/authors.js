'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.get('/', (req, res, next) => {
  knex('authors').then((authors) => {
      res.send(authors);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  let author = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    biography: req.body.biography,
    portrait_url: req.body.portraitUrl
  };

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
      res.send(insertedAuthors[0]);
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
      res.send(author);
    })
    .catch((err) => {
      return next(err);
    });
});

router.get('/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  knex('books').where('author_id', id)
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  let author = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    biography: req.body.biography,
    portrait_url: req.body.portraitUrl
  };

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
    .update(author)
    .then((updatedAuthors) => {
      res.send(updatedAuthors[0]);
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
