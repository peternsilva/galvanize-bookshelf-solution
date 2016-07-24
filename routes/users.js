'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/users', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    const err = new Error('Email must not be blank');

    err.status = 400;

    return next(err);
  }

  if (!password || password.length < 8) {
    const err = new Error('Password must be at least 8 characters long');

    err.status = 400;

    return next(err);
  }

  knex('users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        const err = new Error('Email already exists');

        err.status = 400;

        throw err;
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const { firstName, lastName } = req.body;
      const user = { firstName, lastName, email, hashedPassword };
      const row = decamelizeKeys(user);

      return knex('users').insert(row, '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      req.session.userId = user.id;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
