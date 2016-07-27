'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part2 routes authors bonus', () => {
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

  test('GET /authors/9000', (done) => {
    request(server)
      .get('/authors/9000')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /authors/-1', (done) => {
    request(server)
      .get('/authors/-1')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /authors/abracadabra', (done) => {
    request(server)
      .get('/authors/abracadabra')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('POST /authors without firstName', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/authors')
      .send({
        lastName: 'Downey',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'First name must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /authors without lastName', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/authors')
      .send({
        firstName: 'Allen',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Last name must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /authors without biography', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/authors')
      .send({
        firstName: 'Allen',
        lastName: 'Downey',
        portraitUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Biography must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /authors without portraitUrl', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/authors')
      .send({
        firstName: 'Allen',
        lastName: 'Downey',
        biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Portrait must not be blank', done);

      /* eslint-enable max-len */
  });

  test('PATCH /authors/9000', (done) => {
    request(server)
      .patch('/authors/9000')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('PATCH /authors/-1', (done) => {
    request(server)
      .patch('/authors/-1')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('PATCH /authors/abracadabra', (done) => {
    request(server)
      .patch('/authors/abracadabra')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('DELETE /authors/9000', (done) => {
    request(server)
      .del('/authors/9000')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('DELETE /authors/-1', (done) => {
    request(server)
      .del('/authors/-1')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('DELETE /authors/abracadabra', (done) => {
    request(server)
      .del('/authors/abracadabra')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /authors/9000/books', (done) => {
    request(server)
      .get('/authors/9000/books')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /authors/-1/books', (done) => {
    request(server)
      .get('/authors/-1/books')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /authors/abracadabra/books', (done) => {
    request(server)
      .get('/authors/abracadabra/books')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });
});
