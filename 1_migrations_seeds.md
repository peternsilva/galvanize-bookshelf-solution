## Knex Migrations and Seeds

```shell
createdb bookshelf_dev
createdb bookshelf_test
```

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

1. Develop seed migration to create tables.
2. Insert some initial Data
3. Document the relationships?
