# User Authentication

In this assignment, you'll build a user authentication system for your RESTful, database-driven, HTTP server.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                         favorites                                         │
├────────────────┬─────────────────────────┬────────────────────────────────────────────────┤
│id              │serial                   │primary key                                     │
│book_id         │integer                  │not null references books(id) on delete cascade │
|user_id         │integer                  │not null references users(id) on delete cascade │
│created_at      │timestamp with time zone │not null default now()                          │
│updated_at      │timestamp with time zone │not null default now()                          │
└────────────────┴─────────────────────────┴────────────────────────────────────────────────┘
```

You can run the following test suite to verify the migration file works as expected.

```shell
npm test test/part4.migrations.test.js
```

## Seeds

Translate the following [JavaScript entities](https://gist.github.com/ryansobol/0bcc0058af3ce5823263ac005a34b050) into a Knex seed file. You can run the following test suite to verify the seed file works as expected.

```shell
npm test test/part4.seeds.test.js
```

## `session` routes

In the `routes/session.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                     | Response Status | Response Body                                    |
|----------------|--------------------|------------------------------------------------------------------|-----------------|--------------------------------------------------|
| `GET`          | `/session`         | N/A                                                              | `200`           | `false`                                          |
| `POST`         | `/session`         | `{ "email": "jkrowling@gmail.com", "password": "youreawizard" }` | `200`           | `{ id: 1, "email": "jkrowling@gmail.com", ... }` |
| `GET`          | `/session`         | N/A                                                              | `200`           | `true`                                           |
| `DELETE`       | `/session`         | N/A                                                              | `200`           | `true`                                           |

**NOTE:** Don't send the user's password or hashed password in the response body.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part4.routes.session.test.js
```

## `favorites` routes

Next, update your server to handle the following HTTP request and send the appropriate HTTP response.

**NOTE:** The following routes assume a user where `id = 1` is authenticated.

| Request Method | Request URL      | Response Status | Response Content-Type | Response Body                                                         |
|----------------|------------------|-----------------|-----------------------|-----------------------------------------------------------------------|
| `GET`          | `/favorites`     | `200`           | `application/json`    | `[{ "id": 1, "author_id": 2, "title": "Python In A Nutshell", ... }]` |
| `GET`          | `/favorites/1`   | `200`           | `application/json`    | `{ "id": 1, "author_id": 2, "title": "Python In A Nutshell", ... }`   |
| `POST`         | `/favorites/2`   | `200`           | `application/json`    | `{ "id": 2, "book_id": 2, "user_id": 1 }`                             |
| `DELETE`       | `/favorites/2`   | `200`           | `application/json`    | `{ "book_id": 2, "user_id": 1 }`                                      |

In the `routes/favorites.js` module, add the necessary middleware to handle above RESTful route table.

You can run the following test suite to verify both the positive and the negative cases when the middleware responds with a `200` or `401` status code.

```shell
npm test test/part4.routes.favorites.test.js
```

## Bonus

| Request Method | Request URL        | Request Body                                                     | Response Status | Response Body  |
|----------------|--------------------|------------------------------------------------------------------|-----------------|----------------|
| `POST`         | `/session`         | `{ "email": "bad.email@gmail.com", "password": "youreawizard" }` | `401`           | `Unauthorized` |
| `POST`         | `/session`         | `{ "email": "jkrowling@gmail.com", "password": "badpassword" }`  | `401`           | `Unauthorized` |
