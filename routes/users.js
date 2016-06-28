'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('email must not be blank');
  }

  if (!password) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('password must not be blank');
  }

  knex('users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('Email already exists');
      }

      bcrypt.hash(password, 10, (hashErr, hash) => {
        if (hashErr) {
          return next(hashErr);
        }

        knex('users')
          .insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: email,
            password: hash
          }, '*')
          .then((users) => {
            res.send(users[0]);
            // login newly registered user
          })
          .catch((err) => {
            next(err);
          });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('users')
    .where('id', id)
    .first()
    .then((user) => {
      if (!user) {
        return next();
      }

      return knex('books')
        .innerJoin('users_books', 'users_books.book_id', 'books.id')
        .where('users_books.user_id', id)
        .then((books) => {
          res.send(books);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:userId/books/:bookId', (req, res, next) => {
  const userId = Number.parseInt(req.params.userId);
  const bookId = Number.parseInt(req.params.bookId);

  if (Number.isNaN(userId)) {
    return next();
  }

  if (Number.isNaN(bookId)) {
    return next();
  }

  knex('books')
    .innerJoin('users_books', 'users_books.book_id', 'books.id')
    .where({
      'books.id': bookId,
      'users_books.user_id': userId
    })
    .first()
    .then((book) => {
      if (!book) {
        return next();
      }

      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/:userId/books/:bookId', (req, res, next) => {
  const userId = Number.parseInt(req.params.userId);
  const bookId = Number.parseInt(req.params.bookId);

  if (Number.isNaN(userId)) {
    return next();
  }

  if (Number.isNaN(bookId)) {
    return next();
  }

  knex('users')
    .where('id', userId)
    .first()
    .then((user) => {
      if (!user) {
        return next();
      }

      return knex('books')
        .where('id', bookId)
        .first();
    })
    .then((book) => {
      if (!book) {
        return next();
      }

      return knex('users_books')
        .insert({
          book_id: bookId,
          user_id: userId
        }, '*');
    })
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users/:userId/books/:bookId', (req, res, next) => {
  const userId = Number.parseInt(req.params.userId);
  const bookId = Number.parseInt(req.params.bookId);

  if (Number.isNaN(userId)) {
    return next();
  }

  if (Number.isNaN(bookId)) {
    return next();
  }

  knex('users_books')
    .where({
      user_id: userId,
      book_id: bookId
    })
    .first()
    .then((user_book) => {
      if (!user_book) {
        return next();
      }

      return knex('users_books')
        .del()
        .where({
          user_id: userId,
          book_id: bookId
        })
        .then(() => {
          delete user_book.id;
          res.send(user_book);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/authentication', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (!user) {
        let err = new Error('User does not exist');
        err.status = 400;
        return next(err);
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) {
          return next(err);
        }

        if (!isMatch) {
          const err = new Error('User email or password is not correct');
          err.status = 400;
          return next(err);
        }

        req.session.user = userToCamelCase(user);

        res.cookie('userId', user.id);
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users/authentication', (req, res, next) => {
  req.session = null;
  res.clearCookie('userId');
  res.sendStatus(200);
});

module.exports = router;
