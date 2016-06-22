'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

const bcrypt = require('bcrypt');

router.get('/login', (req, res, next) => {
  // render login page
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      console.log(data[0]);
    })
    .catch((err) => {
      return next(err);
    });
  // log user in if authenticated
});

router.get('/register', (req, res, next) => {
  // render register page
});

router.post('/register', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error();
        err.status = 409;
        return next(err);
      }

      bcrypt.hash(password, 10, (err, hash) => {
        knex('users').returning('*')
          .insert({
            email: email,
            password: hash,
            admin: false
          })
          .then((user) => {
            res.status(200).send(user[0]);
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

router.get('/logout', (req, res, next) => {
  // logout user
  // reidrect to home page
});

module.exports = router;
