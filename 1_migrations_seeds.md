## Knex Migrations and Seeds

In this

```shell
createdb bookshelf_dev
createdb bookshelf_test
```

### Migrations

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

### Seeds

Translate the following [JavaScript entities](https://gist.github.com/ryansobol/fb74ad1e3090b1ce5abdc0d30ae154e8) into Knex seed files.
