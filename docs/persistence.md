## Persistence with Postgres

Having trouble getting the server talk to the database? You've come to the right place.

Create Originate App bootstraps apps that require Postgres for persistence. To set this up on a development machine, put this into your `packages/backend/.env` file:

```
DATABASE_URL=postgres://user@localhost:5432/db
```

Then, locate a directory to store Postgres databases, e.g. `~/dbs`. Run:

```
initdb -U user ~/dbs/cool-app-idea
pg_ctl -D ~/dbs/cool-app-idea start
createdb -D user cool-app-idea
```

This will set up a passwordless Postgres database with the root user `user`. Of course, under no circumstance should you expose this database to the internet.
