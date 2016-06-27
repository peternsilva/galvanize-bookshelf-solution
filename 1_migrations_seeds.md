# Knex Migrations and Seeds

Fork and clone.

```shell
cd galvanize-bookshelf
npm install
```

```shell
brew services stop postgresql
initdb pg
postgres -D
```

```shell
createdb bookshelf_dev
createdb bookshelf_test
```

Update the `knexfile.js` file with the development and test connection information.

```shell
npm test
```

## Migrations

Translate the following entity relationship diagram into Knex migration files.

```text
┌────────────────────────────────────────────────────────────────┐
│                            authors                             │
├─────────────┬─────────────────────────┬────────────────────────┤
│id           │serial                   │primary key             │
│first_name   │varchar(255)             │not null, default ''    │
│last_name    │varchar(255)             │not null, default ''    │
│biography    │text                     │not null, default ''    │
│portrait_url │text                     │not null, default ''    │
│created_at   │timestamp with time zone │not null, default now() │
│updated_at   │timestamp with time zone │not null, default now() │
└─────────────┴─────────────────────────┴────────────────────────┘
                                 ┼
                                 │
                                 │
                                 ○
                                ╱│╲
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                      books                                       │
├─────────────┬─────────────────────────┬──────────────────────────────────────────┤
│id           │serial                   │primary key                               │
│author_id    │integer                  │foreign key authors(id) on delete cascade │
│title        │varchar(255)             │not null, default ''                      │
│genre        │varchar(255)             │not null, default ''                      │
│description  │text                     │not null, default ''                      │
│cover_url    │text                     │not null, default ''                      │
│created_at   │timestamp with time zone │not null, default now()                   │
│updated_at   │timestamp with time zone │not null, default now()                   │
└─────────────┴─────────────────────────┴──────────────────────────────────────────┘
```

More specifically, the Knex migration files should:

- Live in the `migrations` directory.
- Migrate one table per migration file.
- Pass all the tests when `npm test test/part1.migrations.test.js` is run.

## Seeds

Translate the following [JavaScript entities](https://gist.github.com/ryansobol/fb74ad1e3090b1ce5abdc0d30ae154e8) into Knex seed files. More specifically, the Knex seed files should:

- Live in the `seeds` directory.
- Seed one table per seed file.
- Pass all the tests when `npm test test/part1.seeds.test.js` is run.

## Bonus

Deploy the code to Heroku. More specifically, the deployment should:

- Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is the lowercase form of your GitHub username.
- Update the `package.json` file with the version of Node from your development environment.
- Turn on the Heroku PostgreSQL add-on for your new Heroku app.
- Update the `knexfile.js` file with the production connection information.
- Update the `package.json` file with a post-build script to migrate the database.
- Add and commit the changes to your local git repository.
- Push the changes to the master branch of your Heroku remote.
- Run Knex seeds on the production environment.
- Check the production database has the correct number of tables and rows with the `heroku pg:info` command.

Once you're satisfied, find a fellow student and see if he or she would like some help.
