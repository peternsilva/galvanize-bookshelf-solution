'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part2 routes books', () => {
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

  test('GET /books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/books')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 5,
        authorId: 6,
        title: 'Algorithms in a Nutshell',
        genre: 'Computer Science',
        description: 'Creating robust software requires the use of efficient algorithms, but programmers seldom think about them until a problem occurs. This updated edition of Algorithms in a Nutshell describes a large number of existing algorithms for solving a variety of problems, and helps you select and implement the right algorithm for your needs—with just enough math to let you understand and analyze algorithm performance.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920032885/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 8,
        authorId: 9,
        title: 'AngularJS: Up and Running',
        genre: 'JavaScript',
        description: 'If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you’ll understand how to develop a large, maintainable, and performant application with AngularJS.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 7,
        authorId: 8,
        title: 'Head First Ruby',
        genre: 'Ruby',
        description: 'What’s all the buzz about this Ruby language? Is it right for you? Well, ask yourself: are you tired of all those extra declarations, keywords, and compilation steps in your other language? Do you want to be a more productive programmer? Then you’ll love Ruby. With this unique hands-on learning experience, you’ll discover how Ruby takes care of all the details for you, so you can simply have fun and get more done with less code.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/9780596803995/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 3,
        authorId: 4,
        title: 'Learning React Native',
        genre: 'JavaScript',
        description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you’ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You’ll also discover how to access platform features such as the camera, user location, and local storage.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/learning_react_native.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 11,
        authorId: 12,
        title: 'Lightweight Django',
        genre: 'Python',
        description: 'How can you take advantage of the Django framework to integrate complex client-side interactions and real-time features into your web applications? Through a series of rapid application development projects, this hands-on book shows experienced Django developers how to include REST APIs, WebSockets, and client-side MVC frameworks such as Backbone.js into new or existing projects.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920032502/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 1,
        authorId: 2,
        title: 'Python In A Nutshell',
        genre: 'Python',
        description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 6,
        authorId: 7,
        title: 'The Ruby Programming Language',
        genre: 'Ruby',
        description: 'The Ruby Programming Language documents the Ruby language definitively but without the formality of a language specification. It is written for experienced programmers who are new to Ruby, and for current Ruby programmers who want to challenge their understanding and increase their mastery of the language.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/9780596516178/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 10,
        authorId: 11,
        title: 'Think Java',
        genre: 'Java',
        description: 'Think Java is appropriate as a textbook in an introductory college or high school class. The book is currently in use at several colleges, universities, and high schools. It’s appropriate for people learning Java as a first language, including students learning on their own and professionals who are retraining.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920041610/rc_lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 2,
        authorId: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 9,
        authorId: 10,
        title: 'Web Development with Node and Express',
        genre: 'JavaScript',
        description: 'Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You’ll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 4,
        authorId: 5,
        title: 'You Don\'t Know JS',
        genre: 'JavaScript',
        description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the ""You Don’t Know JS"" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });

  test('GET /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/books/2')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 2,
        authorId: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg',
        createdAt: new Date('2016-06-26 14:26:16 UTC').toISOString(),
        updatedAt: new Date('2016-06-26 14:26:16 UTC').toISOString()
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .send({
        authorId: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 12,
        authorId: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('PATCH /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .patch('/books/2')
      .send({
        authorId: 2,
        title: 'Think like Python',
        genre: 'Python stuff',
        description: 'More Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 2,
        authorId: 2,
        title: 'Think like Python',
        genre: 'Python stuff',
        description: 'More Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('DELETE /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/books/2')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        authorId: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });
});
