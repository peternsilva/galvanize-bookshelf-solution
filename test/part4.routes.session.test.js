'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes session', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex('users')
      .del()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST /session', (done) => {
    const password = 'ilikebigcats';

    /* eslint-disable no-sync */
    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync(password, 1)
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'john.siracusa@gmail.com',
            password
          })
          .expect('set-cookie', /bookshelf=[a-zA-Z0-9=]*; path=\//)
          .expect('set-cookie', /bookshelf.sig=[a-zA-Z0-9=\-_]*; path=\//)
          .expect('Content-Type', /plain/)
          .expect(200, 'OK', done);
      })
      .catch((err) => {
        done(err);
      });

      /* eslint-enable no-sync */
  });

  test('POST /session with bad email', (done) => {
    const password = 'ilikebigcats';

    /* eslint-disable no-sync */
    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync(password, 1)
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'bad.email@gmail.com',
            password
          })
          .expect('Content-Type', /plain/)
          .expect(401, 'User could not be logged in', done);
      })
      .catch((err) => {
        done(err);
      });

      /* eslint-enable no-sync */
  });

  test('POST /session with bad password', (done) => {
    /* eslint-disable no-sync */
    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync('ilikebigcats', 1)
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'john.siracusa@gmail.com',
            password: 'badpassword'
          })
          .expect('Content-Type', /plain/)
          .expect(401, 'User could not be logged in', done);
      })
      .catch((err) => {
        done(err);
      });

      /* eslint-enable no-sync */
  });

  test('DELETE /session', (done) => {
    request(server)
      .delete('/session')
      .expect('set-cookie', /bookshelf=; path=\//)
      .expect('set-cookie', /bookshelf.sig=[a-zA-Z0-9=\-_]*; path=\//)
      .expect('Content-Type', /plain/)
      .expect(200, 'OK', done);
  });
});
