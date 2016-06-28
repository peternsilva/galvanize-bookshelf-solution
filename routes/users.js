'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const bookToCamelCase = function(book) {
  return {
    id: book.book_id,
    title: book.title,
    genre: book.genre,
    description: book.description,
    coverUrl: book.cover_url,
    authorId: book.author_id
  };
};

const userToCamelCase = function(user) {
  return {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email
  };
};

router.post('/users', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  knex('users')
    .where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error('Email already exists');
        err.status = 409;
        return next(err);
      }

      bcrypt.hash(password, 10, (err, hash) => {
        knex('users')
          .insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: email,
            password: hash
          }, '*')
          .then((user) => {
            res.status(200).send(userToCamelCase(user[0]));
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

  knex('books')
    .innerJoin('users_books', 'users_books.book_id', 'books.id')
    .where('users_books.user_id', id)
    .then((books) => {
      res.send(books.map(bookToCamelCase));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:userId/books/:bookId', (req, res, next) => {
  const userId = Number.parseInt(req.params.userId);
  const bookId = Number.parseInt(req.params.bookId);

  knex('books')
    .innerJoin('users_books', 'users_books.book_id', 'books.id')
    .where({
      'books.id': bookId,
      'users_books.user_id': userId
    })
    .then((books) => {
      if (!books.length) {
        return res.sendStatus(404);
      }

      res.send(bookToCamelCase(books[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/:userId/books/:bookId', (req, res, next) => {
  const userId = Number.parseInt(req.params.userId);
  const bookId = Number.parseInt(req.params.bookId);

  knex('users_books')
    .insert({
      book_id: bookId,
      user_id: userId
    }, '*')
    .then((insertedUserBook) => {
      res.send(bookToCamelCase(insertedUserBook[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users/:userId/books/:bookId', (req, res, next) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  knex('users_books')
    .del()
    .where({
      user_id: userId,
      book_id: bookId
    })
    .then(() => {
      res.send(`Deleted book from your library.`);
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
