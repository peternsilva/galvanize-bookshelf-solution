# User Registration

In this assignment, you'll build a user registration system for the HTTP server.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌──────────────────────────────────────────────────────────────────┐
│                              users                               │
├────────────────┬─────────────────────────┬───────────────────────┤
│id              │serial                   │primary key            │
│first_name      │varchar(255)             │not null default ''    │
│last_name       │varchar(255)             │not null default ''    │
│email           │varchar(255)             │not null unique        │
|hashed_password |char(60)                 │not null               │
│created_at      │timestamp with time zone │not null default now() │
│updated_at      │timestamp with time zone │not null default now() │
└────────────────┴─────────────────────────┴───────────────────────┘
```

You can run the following test suite to verify the migration file works as expected.

```shell
npm test test/part3.migrations.test.js
```

## Routes

In the `routes/users.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Body                                                                                  |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|------------------------------------------------------------------------------------------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `200`           | `{ id: 2, "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com" }` |


**NOTE:** Only store a cryptographic hash of the password in the database. And do _not_ send the new user's password or hashed password in the response body.

You can run the following test suite to verify the positive case when the middleware responds with a `200` status code.

```shell
npm test test/part3.routes.users.test.js
```

## Bonus

Next, update your server to handle the following problem HTTP requests and send the appropriate HTTP response.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Content-Type | Response Body                |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|------------------------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "password": "ilikebigcats" }`                                     | `400`           | `text/plain`          | `Email must not be blank`    |
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com" }`                             | `400`           | `text/plain`          | `Password must not be blank` |
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `400`           | `text/plain`          | `Email already exists`       |

In the `routes/users.js` module, update the necessary middleware to handle above RESTful route table. Make sure the route handler continues to securely register new users as before.

You can run the following test suite to verify the negative cases when the middleware responds with a `400` status code.

```shell
npm test test/part3.routes.users.test.js
```
