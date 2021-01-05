# @replaceme

The create-originate-app framework consists of two sub-packages which each run a server. There is
a **backend** API server, and a **frontend** server that serves React code.

## Documentation

[Developing Documentation](./DEVELOPING/index.md)

## Getting started

### Install Dependencies

Install Docker, and make sure it is running. See https://docs.docker.com/get-docker/

### Install

create-originate-app has already run `yarn` in this directory.

### Frontend

Start the Frontend Nextjs server: `yarn dev:frontend`

### Backend

Start the Backend Nest server: `yarn dev:backend`

### Environment Variables

We use
[@next/env](https://nextjs.org/docs/basic-features/environment-variables)
to load environment variables from `.env*` files in both the frontend and
backend packages. See [the docs](./DEVELOPING/environment-variables.md) for
details. Briefly you can have multiple env files that are loaded depending on
the environment.

- `.env` - always loaded
- `.env.local` - always loaded, any variables here override values in `.env`
- `.env.development` - loaded in development mode (COA provides this one)
- `.env.development.local` - loaded in development, any variables here override
  values in `.env.development`
- `.env.test`, `.env.production` - loaded in test or production modes; and you
  can provide `.env*.local` versions too

The reason for `.env*.local` files is so that you can have variables checked
into version control that can be overridden by `.local` files that are not in
version control.

## Using the App

(If you've previously used create-originate-app to create a application with the same name, you'll need to remove the database docker container from the previous run. You can do that by running `yarn workspace @replaceme/backend db:destroy`)

You can access your application as follows:

- Frontend: http://localhost:@frontendPort
- Backend: http://localhost:@backendPort
- GraphQL playground: http://localhost:@backendPort/graphql
- Database: postgres://postgres:password@localhost:@dbPort/postgres
