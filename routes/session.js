'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/session', (req, res) => {
  if (req.session.userId) {
    return res.send(true);
  }

  res.send(false);
});

router.post('/session', (req, res, next) => {
  let user;

  knex('users')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (!row) {
        const err = new Error('User could not be logged in');

        err.status = 401;

        throw err;
      }

      user = _.mapKeys(row, (v, k) => _.camelCase(k));

      return bcrypt.compare(req.body.password, user.hashedPassword);
    })
    .then(() => {
      req.session.userId = user.id;
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      const err = new Error('User could not be logged in');

      err.status = 401;

      throw err;
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/session', (req, res) => {
  req.session = null;
  res.sendStatus(200);
});

module.exports = router;
