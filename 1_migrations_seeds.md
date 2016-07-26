# Knex Migrations and Seeds

For this assignment, your task is to build a web application to manage a book collection. In the first part, you'll lay the foundation by creating a Knex migration and seed files. Start by forking and cloning this repository to your development environment.

Then, install the necessary dependencies via NPM.

```shell
cd galvanize-bookshelf
npm install
```

Next, ensure there's a PostgreSQL server running on your machine and create both a development and a test database.

```shell
createdb bookshelf_dev
createdb bookshelf_test
```

Next, open the project in your text editor.

```shell
atom .
```

And, update the `knexfile.js` file with the following connection information for each environment.

```javascript
'postgres://localhost/bookshelf_dev'
'postgres://localhost/bookshelf_test'
```

Then, generate a secret key that'll be used to sign session information. You'll learn what a session is and why it's signed in an upcoming lesson.

```shell
bash -c 'echo "SESSION_SECRET="$(openssl rand -hex 64)' > .env
```

Finally, ensure the test suite can connect to the right database.

```shell
npm test test/part1.migrations.test.js
```

## Migrations

Translate the following entity relationship diagram into Knex migration files.

```text
┌───────────────────────────────────────────────────────────────┐
│                            authors                            │
├─────────────┬─────────────────────────┬───────────────────────┤
│id           │serial                   │primary key            │
│first_name   │varchar(255)             │not null default ''    │
│last_name    │varchar(255)             │not null default ''    │
│biography    │text                     │not null default ''    │
│portrait_url │text                     │not null default ''    │
│created_at   │timestamp with time zone │not null default now() │
│updated_at   │timestamp with time zone │not null default now() │
└─────────────┴─────────────────────────┴───────────────────────┘
                                ┼
                                │
                                │
                                ○
                               ╱│╲
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          books                                           │
├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
│id           │serial                   │primary key                                       │
│author_id    │integer                  │not null references authors(id) on delete cascade │
│title        │varchar(255)             │not null default ''                               │
│genre        │varchar(255)             │not null default ''                               │
│description  │text                     │not null default ''                               │
│cover_url    │text                     │not null default ''                               │
│created_at   │timestamp with time zone │not null default now()                            │
│updated_at   │timestamp with time zone │not null default now()                            │
└─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
```

More specifically, the migration files should:

- Live in the `migrations` directory.
- Migrate one table per migration file.
- Pass all the tests when `npm test test/part1.migrations.test.js` is run.

## Seeds

Translate the following author and book [JavaScript entities](https://gist.github.com/ryansobol/fb74ad1e3090b1ce5abdc0d30ae154e8) into Knex seed files. More specifically, the seed files should:

- Live in the `seeds` directory.
- Seed one table per seed file.
- Pass all the tests when `npm test test/part1.seeds.test.js` is run.

## Bonus

Using the [Knex documentation](http://knexjs.org/), chain an index onto the `books.author_id` foreign key column.

## Bonus

Linting

Once you're satisfied, find a classmate and see if he or she would like some help.
