/* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('authors').del()
    .then(() => {
      return knex('authors').insert([{
        id: 1,
        first_name: 'Douglas',
        last_name: 'Crockford',
        biography: "Douglas Crockford is a Senior JavaScript Architect at Yahoo!, well known for introducing and maintaining the JSON (JavaScript Object Notation) format. He's a regular speaker at conferences on advanced JavaScript topics, and serves on the ECMAScript committee.",
        portrait_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/282/douglas_crawford.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        first_name: 'Bonnie',
        last_name: 'Eisenman',
        biography: 'Bonnie Eisenman is a software engineer at Twitter, with previous experience at Codecademy, Fog Creek Software, and Google. She has spoken at several conferences on topics ranging from ReactJS to musical programming and Arduinos. In her spare time, she enjoys building electronic musical instruments, tinkering with hardware projects, and laser-cutting chocolate. Find her on Twitter as @brindelle.',
        portrait_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/285/bonnie_eisenman.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        first_name: 'Kyle',
        last_name: 'Simpson',
        biography: "Kyle Simpson is an Open Web Evangelist who's passionate about all things JavaScript. He's an author, workshop trainer, tech speaker, and OSS contributor/leader.",
        portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        first_name: 'Shyam',
        last_name: 'Seshadri',
        biography: 'Currently based out of India, Shyam Seshadri is the CEO of Fundoo Solutions (http://www.befundoo.com), Ex-Googler, Author and Chef. He currently spends his time working on interesting product ideas, conducting training sessions internationally on AngularJS & NodeJS, and providing development and architecture consulting on AngularJS, NodeJS and Mobile applications. He conducts extensive, customized two and three day, hands-on workshops for AngularJS & NodeJS, which have been well received internationally.',
        portrait_url: 'http://cdn.oreillystatic.com/images/people/154/shyam_seshadri-1.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        first_name: 'Ethan',
        last_name: 'Brown',
        biography: 'Ethan Brown is a senior software engineer at Pop Art, a Portland-based interactive marketing agency, where he is responsible for the architecture and implementation of web sites and web services for clients ranging from small businesses to international enterprise companies. He has over twenty years of programming experience, from embedded to the web, and has embraced the JavaScript stack as the web platform of the future.',
        portrait_url: 'http://cdn.oreillystatic.com/images/people/154/ethan_brown.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('authors_id_seq', (SELECT MAX(id) FROM authors));"
      );
    });
};
