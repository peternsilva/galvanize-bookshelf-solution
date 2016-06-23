'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);
const _ = require('lodash');

const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

router.post('/authentication', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users').first()
    .where('email', email)
    .then((user) => {
      if (!user) {
        let err = new Error('User does not exist');
        err.status = 400;
        return next(err);
      }

      bcrypt.compare(password, user.password, function (err, isMatch) {
        if(err) {
          return next(err);
        }

        if (!isMatch) {
          const err = new Error('User email or password is not correct');
          err.status = 400;
          return next(err);
        }

        req.session.user = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name
        };

        res.cookie('userId', user.id);
        res.sendStatus(200);
      });
      // let data = {
      //   id: user.id,
      //   firstName: user.first_name,
      //   lastName: user.last_name
      // };
      // let secret = process.env.SECRET || 'secret';
      // let options = {
      //   expiresInMinutes: 15
      // };
      //
      // jwt.sign(data, secret, options, (err, token) => {
      //   if (err) {
      //     return next(err);
      //   }
      //
      //   res.send(token);
      // });
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error('Email already exists');
        err.status = 409;
        return next(err);
      }

      bcrypt.hash(password, 10, (err, hash) => {
        knex('users').returning('*')
          .insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: email,
            password: hash
          })
          .then((user) => {
            res.status(200).send(_.omit(user[0], 'password'));
            // login newly registered user
          })
          .catch((err) => {
            return next(err);
          });
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.delete('/authentication', (req, res, next) => {
  req.session = null;
  res.clearCookie('userId');
  res.sendStatus(200);
});

module.exports = router;
