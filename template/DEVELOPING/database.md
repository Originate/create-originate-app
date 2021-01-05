# Working with the Database

Create-originate-app assumes a PostgreSQL database. To speed up development we
provide automation for running development and test databases in docker
containers. We also automatically update the development database schema in real
time on code changes, and provide a script to generate migrations when
committing code with database schema changes (see "Schema Sync in Development vs
Migrations in Production" below).

## Managing the Development Database

Database interaction is handled exclusively by the `backend` sub-package. So
before running the commands below make sure to `cd packages/backend`. You'll
also need to make sure that you have docker installed and running.

## starting

To start up a development database run,

    $ yarn db:start

This will create a docker container with a name based on your app's name (read
from `packages/backend/package.json`), with a database published on the port
specified by the `DATABASE_URL` variable in your `.env.development` file. Or if
a container exists with the expected name it will be started if it was stopped.

> ℹ️ When you generate a project with create-originate-app, `DATABASE_URL` is
> automatically configured with a random port. This is so that you can run dev
> databases for multiple projects without port or container name conflicts (if
> you use distinct app names). COA is designed to support one, and only one, dev
> database container.

Starting the database is idempotent so it is safe to run this command as part of
a dev startup script. (In fact `yarn dev:backend` does this.) The database is
persistent: data is retained if the container is stopped, or if you reboot.

When you first start a database it will be empty. See "Schema Sync vs
Migrations" below for information on setting up your schema.

## stopping

To stop the database container run,

    $ yarn db:stop

Data in the database is preserved while the container is stopped. Running `yarn db:start` will restart it.

Stopping is idempotent so it's safe to use in a script. The backend dev server
does **not** automatically stop the dev database on shutdown.

## destroying

If you want to start from a fresh database run,

    $ yarn db:destroy

This will remove the dev database container whether it is running or stopped.
This command does **not** ask for confirmation.

## connecting directly with psql

To start a `psql` shell run,

    $ yarn db:shell

This will run the `psql` executable in your dev database container, and will
connect to your dev database. This command assumes that the dev database
container is running, so you may have to run `yarn db:start` first.

## Managing Test Databases

Backend end-to-end (e2e) tests run the full application with a real HTTP server,
and a real database. These tests are run with the full test suite when running
`yarn test` in the root package, or can be run alone in the backend sub-package
with `yarn test:e2e`. E2e test files are located in `packages/backend/tests/`.

For each e2e test module/file we spin up a temporary postgres database in
a docker container. This is done automatically via the `getTestDatabase()`
helper function from the `originate-scripts` package. Because each module gets
its own database it is safe to run these tests in parallel, and it is safe to
run them in watch mode. But note that because we only spin up one database per
test module, database state does carry over between tests in the same module.

> ⚠ Test databases should be stopped automatically after each test module runs.
> But sometimes they keep running - especially if you encounter errors during
> a test. You might want to run `docker ps` from time to time to check whether
> you are accumulating running databases. Test database containers are ephemeral
> so if you stop one with `docker stop container_name` the container will be
> removed automatically after it stops.

## TypeORM Database Entities

Create-originate-app sets up [TypeORM][] which encourages a code-first design which
means that the database schema is inferred from TypeScript code. Database models
are written as **entity** classes (classes that have an `@Entity()` annotation).
For example, here is the [Recipe][] entity with all of the non-database-related
annotations removed:

[typeorm]: https://typeorm.io/
[recipe]: ../packages/backend/src/recipes/models/recipe.entity.ts

```ts
@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @Column()
  title!: string

  @Column({ nullable: true, type: "text" })
  description?: string

  @ManyToMany(_type => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients?: Ingredient[]
}
```

Class variables with `Column` annotations represent database columns. There are
multiple possible `Column` annotations including `@Column()`,
`@PrimaryGeneratedColumn()`, `@CreateDateColumn()`, and others. We also see
a `@JoinTable()` annotation which represents an entire table. For details see
the [TypeORM entity documentation][]. The point is that there is sufficient
information in the entity class to infer a full database schema for a `recipe`
table. In combination with the `Ingredient` entity class there is sufficient
information to infer schemas for `ingredient` and
`recipe_ingredients_ingredient` tables too.

[typeorm entity documentation]: https://typeorm.io/#/entities

> ℹ️ Non-nullable columns have an exclamation mark (!) after the class variable
> name. We expect that those variables will always have values even though we
> don't initialize them in the class definition. The exclamation mark is
> a non-null assertion that instructs TypeScript not to show an error.

### registering database entities with the application

TypeORM needs to know about your entity class when syncing the database schema.
To make that happen every new entity class needs to be wired into a [NestJS
module][]. For example this line from [RecipesModule][] wires in the
`Ingredient` and `Recipe` entity classes,

```ts
imports: [TypeOrmModule.forFeature([Ingredient, Recipe])],
```

It's also important to use a file name for your class that ends with
`.entity.ts` so that the migration generation script can find it.

[nestjs module]: ./NestJS.md#modules
[recipesmodule]: ../packages/backend/src/recipes/recipes.module.ts

## Schema Sync in Development vs Migrations in Production

When committing code that requires database schema changes it is important to
include a migration in your commit that includes code for updating the
production database schema. Migrations are good for production because they can
be code-reviewed, and provide reproducible database schema state. But writing
and running migrations results in a slow iteration cycle in development. So in
local development instead of running migrations we use a database schema sync
feature provided by TypeORM. Schema-sync updates your development database
schema in real time whenever you make code changes as long as you have the dev
server running. The same feature provides always-up-to-date schemas in test
databases when you run e2e tests locally.

> ℹ️ E2e tests use schema sync when run locally for a fast test-driven iteration
> cycle. When run in CI e2e tests apply migrations instead to match the
> production environment as closely as possible. This means that if your tests
> are written well they will fail in CI if you forget to check in a migration
> even if they pass locally. The logic for turning on schema sync is in
> [AppModule][] in the `synchronize` option of the `TypeORM.forRoot`
> configuration.

[appmodule]: ../packages/backend/src/app.module.ts

In development mode and in local testing TypeORM infers the expected database
schema from annotations in database entity classes, computes a diff with the
existing database schema, and automatically applies schema changes to make the
actual schema match the expected schema. **Yes this is going to result in data
loss sometimes** - so it's a good idea to build your work flow so that you can
reconstruct any important data in your development database when necessary.

> ⚠ Try to avoid running migrations in local development unless you are willing
> to destroy and recreate your development database. If you have used database
> schema sync, and then run migrations the migrations are likely to fail.

## Generating Migrations

You don't need migrations for local development and testing. But when you're
ready to open a pull request that includes database schema changes it's time to
commit a migration. The easiest way to do so is to run this command in the
backend sub-package,

    $ yarn db:migration:generate -n MyMigration

That will create a migration class in `packages/backend/src/migration/`. The
class name is based on the `-n` argument that you provide plus a number that
provides a consistent order for migrations. Please feel free to edit the
migration to make tweaks, add additional indexes, massage data, or whatever you
need. It's just important that any changes you make are compatible with the
expected database schema that TypeORM infers from app code. You can check that
by running the above command again; if it does not generate another migration
then you are good. Some consequences are that it's not OK to change table or
column names or types in migrations. If you want custom names or types there are
options for specifying them in entity class annotations.

> ℹ️ When you run the command to generate a migration the script spins up
> a fresh temporary database, applies existing migrations, computes a diff
> between the expected schema based on code and the actual schema, and generates
> SQL code based on that diff. A new migration will include schema changes based
> on all new or changed entity classes at once.

## originate-scripts

The commands and supporting code for managing development and test databases,
and for generating migrations are maintained in the [originate-scripts][]
package. Improvements and features may be added to originate-scripts from time
to time. You can get updates by updating the originate-scripts dependency
version in the backend sub-package,

    $ cd packages/backend && yarn add --dev originate-scripts

[originate-scripts]: https://www.npmjs.com/package/originate-scripts
