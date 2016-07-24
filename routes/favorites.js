'use strict';

const _ = require('lodash');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');

const router = express.Router(); // eslint-disable-line new-cap

const checkAuth = function(req, res, next) {
  if (!req.session.userId) {
    return next(boom.create(401, 'Unauthorized'));
  }

  next();
};

router.get('/favorites', (req, res, next) => {
  knex('favorites')
    .innerJoin('books', 'books.id', 'favorites.book_id')
    .where('favorites.user_id', req.session.userId)
    .orderBy('books.title', 'ASC')
    .then((rows) => {
      const favs = _.map(rows, (r) => _.mapKeys(r, (v, k) => _.camelCase(k)));

      res.send(favs);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/favorites/check', checkAuth, (req, res, next) => {
  const bookId = Number.parseInt(req.query.bookId);

  knex('books')
    .innerJoin('favorites', 'favorites.book_id', 'books.id')
    .where({
      'favorites.book_id': bookId,
      'favorites.user_id': req.session.userId
    })
    .first()
    .then((row) => {
      if (row) {
        return res.send(true);
      }

      res.send(false);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/favorites', checkAuth, (req, res, next) => {
  const bookId = Number.parseInt(req.body.bookId);

  if (Number.isNaN(bookId)) {
    return next();
  }

  knex('books')
    .where('id', bookId)
    .first()
    .then((book) => {
      if (!book) {
        throw boom.create(404, 'Not Found');
      }

      const favorite = { bookId, userId: req.session.userId };
      const row = _.mapKeys(favorite, (v, k) => _.snakeCase(k));

      return knex('favorites').insert(row, '*');
    })
    .then((rows) => {
      const favorite = _.mapKeys(rows[0], (v, k) => _.camelCase(k));

      res.send(favorite);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/favorites', checkAuth, (req, res, next) => {
  const bookId = Number.parseInt(req.body.bookId);

  if (Number.isNaN(bookId)) {
    return next();
  }

  let favorite;

  knex('favorites')
    .where({
      book_id: bookId,
      user_id: req.session.userId
    })
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      favorite = _.mapKeys(row, (v, k) => _.camelCase(k));

      return knex('favorites')
        .del()
        .where('id', favorite.id);
    })
    .then(() => {
      delete favorite.id;

      res.send(favorite);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
