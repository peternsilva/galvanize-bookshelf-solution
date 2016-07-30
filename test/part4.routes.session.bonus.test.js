// test('POST /session with bad email', (done) => {
//   const password = 'ilikebigcats';
//
//   /* eslint-disable no-sync */
//   knex('users')
//     .insert({
//       first_name: 'John',
//       last_name: 'Siracusa',
//       email: 'john.siracusa@gmail.com',
//       hashed_password: bcrypt.hashSync(password, 1)
//     })
//     .then(() => {
//       request(server)
//         .post('/session')
//         .set('Content-Type', 'application/json')
//         .send({
//           email: 'bad.email@gmail.com',
//           password
//         })
//         .expect('Content-Type', /plain/)
//         .expect(401, 'Bad email or password', done);
//     })
//     .catch((err) => {
//       done(err);
//     });
//
//     /* eslint-enable no-sync */
// });
//
// test('POST /session with bad password', (done) => {
//   /* eslint-disable no-sync */
//   knex('users')
//     .insert({
//       first_name: 'John',
//       last_name: 'Siracusa',
//       email: 'john.siracusa@gmail.com',
//       hashed_password: bcrypt.hashSync('ilikebigcats', 1)
//     })
//     .then(() => {
//       request(server)
//         .post('/session')
//         .set('Content-Type', 'application/json')
//         .send({
//           email: 'john.siracusa@gmail.com',
//           password: 'badpassword'
//         })
//         .expect('Content-Type', /plain/)
//         .expect(401, 'Bad email or password', done);
//     })
//     .catch((err) => {
//       done(err);
//     });
//
//     /* eslint-enable no-sync */
// });
