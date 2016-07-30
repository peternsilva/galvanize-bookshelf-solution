'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes session bonus', () => {
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
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST /session with no email', (done) => {
    request(server)
      .post('/session')
      .set('Content-Type', 'application/json')
      .send({
        password: 'youreawizard'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Email must not be blank', done);
  });

  test('POST /session with no password', (done) => {
    request(server)
      .post('/session')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Password must not be blank', done);
  });

  test('POST /session with bad email', (done) => {
    request(server)
      .post('/session')
      .set('Content-Type', 'application/json')
      .send({
        email: 'bad.email@gmail.com',
        password: 'youreawizard'
      })
      .expect('Content-Type', /plain/)
      .expect(401, 'Bad email or password', done);
  });

  test('POST /session with bad password', (done) => {
    request(server)
      .post('/session')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'badpassword'
      })
      .expect('Content-Type', /plain/)
      .expect(401, 'Bad email or password', done);
  });
});
