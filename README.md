# create-originate-app

This project is designed to make it easy to set up a Nextjs/Nest/TypeORM app!
Let's get you oriented with what's here and how to use it.

---

## Features

### Full-stack framework

An API backend powered by [NestJS][] provides a fully-featured GraphQL and REST
framework, and a database interface to PostgreSQL. The frontend is powered by
[Next.js][] which provides server-side rendering, static page generation,
routing, and a number of other useful features.

Start the app with `yarn dev:backend` and `yarn dev:frontend`

> ℹ️ Why don't we have one script that runs both servers? The backend dev script
> clears the terminal when files change, and mixing output from both scripts
> makes it hard to tell what is going on. But if you want to run both servers in
> one terminal you can use this command (with a single &):
> `yarn dev:backend & yarn dev:frontend`

For some more details on how NestJS and Next.js work, and how they fit together
see [the developing docs][developing].

[nestjs]: https://nestjs.com/
[next.js]: https://nextjs.org/
[developing]: ./template/DEVELOPING/index.md

### Database out-of-the-box

When you run `yarn dev:backend` a postgres database automatically starts up in
a docker container. Running backend end-to-end tests with
`yarn workspace @myapp/backend test:e2e --watch`
creates a fresh, temporary database for each run of
each test file. The dev database is persistent, but can be recreated from
scratch at any time by running `yarn workspace @myapp/backend db:destroy`. Test
database containers are deleted once tests complete.

### Rapid development cycle

The app database schema is inferred from code. In development mode when you make
a change to your database code, the schema of the dev database updates instantly
to match. When you're ready to commit changes generate a migration to run in
production with `yarn workspace @myapp/backend db:migration:generate -n MyMigration`.

> ℹ️ After generation, migrations can be modified by hand to add custom indexes,
> to massage data, etc.

The app GraphQL schema is also inferred from code, and also updates instantly
when you make code changes.

The frontend implements [fast refresh][]. When you make changes to code, changed
React components are updated in the browser without reloading the entire page,
and without losing local state.

[fast refresh]: https://nextjs.org/docs/basic-features/fast-refresh

### End-to-end type safety

React code fetches data from the API via GraphQL queries embedded in TypeScript
code. A TypeScript compiler plugin provides IDE completions, error checking, and
type display as you write queries. Automatically-generated TypeScript interfaces
allow TypeScript to infer the exact type of result data for each query, and to
infer types of variables required by each query. Changes to the API will produce
type errors if they introduce incompatibility with the frontend implementation,
and vice versa.

> ℹ️ GraphQL queries do require a type assertion to make type inference work. It
> looks like `as import(@graphql-typed-document-node/core).TypedDocumentNode<...`
> Don't bother writing those yourself - run `yarn lint --fix` to have the
> appropriate type assertion put in automatically.

### Server-side rendering, and static generation

Server-side rendering is easy with [Next.js][]. Public landing pages, and other
pages that do not update frequently can be pre-rendered (static generation), or
can be rendered on-demand server-side. That provides fast page load times for
cases where minimizing bounce rates is important without requiring a separate
system for static pages. Most of the time you can write React code as usual
without thinking about server-side rendering. But when you need it, the tools
are there.

> ℹ️ Server-side rendering pairs very nicely with a CDN!

### CI

TODO: We plan to ship a complete CI configuration using Github Actions. This
will run tests, as well as sanity checks such as checking that generated GraphQL
files are up-to-date, and that migrations are in sync with app code.

### Ready to deploy

TODO: We hope to provide deployment scripts that will work out-of-the-box with
minimal manual setup.

### Expandable with features for your use case

The [NestJS][] module system in particular makes it possible to extract pieces
of app behavior into reusable components. We want to set up modules for features
like authentication with different providers, CMS integration, cloud file
storage with different providers, etc. And because NestJS is a well-known
framework you may be able to find the feature you want available on NPM, ready
to drop into your app.

---

## Getting started

### Prerequisites

Make sure you have:

- Node
- Yarn
- Docker

We recommended the latest Node LTS release, which at the time of this writing is
v14.

Docker must be set up so that you can run it without using `sudo`, and the
Docker executable has to be called `docker`.

### 1. Generate an app

Run this command,

    $ npx create-originate-app myapp

### 2. Start the app

Start the backend and frontend in separate terminals with these commands:

    $ yarn dev:backend

    $ yarn dev:frontend

You can access the interactive GraphQL playground on the backend server at
http://localhost:4000/graphql, and the frontend at http://localhost:3000/

---

## Documentation

For more detailed documentation on working with the COA framework see
[`template/DEVELOPING/index.md`][developing]

---

## Automated releases

This project uses an automated release system which requires that pull requests
be merged in a special way. Please read the [contributing
guidelines](./CONTRIBUTING.md) before merging pull requests.
