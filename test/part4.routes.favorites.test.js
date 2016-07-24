'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes favorites', () => {
  const agent = request.agent(server);

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
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'jkrowling@gmail.com',
            password: 'youreawizard'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            agent.saveCookies(res);
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /favorites', (done) => {
    /* eslint-disable max-len */
    agent
      .get('/favorites')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        bookId: 1,
        userId: 1,
        authorId: 2,
        title: 'Python In A Nutshell',
        genre: 'Python',
        description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });

  test('GET /favorites/check?bookId=1', (done) => {
    agent
      .get('/favorites/check?bookId=1')
      .expect('Content-Type', /json/)
      .expect(200, 'true', done);
  });

  test('GET /favorites/check?bookId=2', (done) => {
    agent
      .get('/favorites/check?bookId=2')
      .expect(200, 'false', done);
  });

  test('POST /favorites', (done) => {
    agent
      .post('/favorites')
      .set('Content-Type', 'application/json')
      .send({ bookId: 2 })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, { id: 2, bookId: 2, userId: 1 }, done);
  });

  test('DELETE /favorites', (done) => {
    agent
      .delete('/favorites')
      .set('Content-Type', 'application/json')
      .send({ bookId: 1 })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, { bookId: 1, userId: 1 }, done);
  });
});
