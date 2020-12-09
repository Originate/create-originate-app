# @replaceme

The create-originate-app framework consists of two sub-packages which each run a server. There is
a **backend** API server, and a **frontend** server that serves React code.

## Documentation Contents

- [NestJS](./NestJS.md) for information on the backend API server

## Key Technologies

- [NestJS](https://nestjs.com/) powers the backend API in the `backend`
  sub-package.
- [TypeORM](https://typeorm.io/) provides the database interface, and manages
  migrations.
- We encourage use of [GraphQL](https://graphql.org/) for your API. NestJS
  provides a GraphQL server framework.
- The frontend uses [Apollo Client](https://www.apollographql.com/docs/react/)
  to fetch data from the GraphQL API.
- [Next.js](https://nextjs.org/) servers the frontend, and provides routing,
  server-side rendering, and other features.

## Getting started

### Install Dependancies
Install application dependencies by running: `yarn`

### Frontend
Start the Frontend Nextjs server: `yarn dev:frontend` 

### Backend
Setup your backend ENV. This will be handled more gracefully in the future. 

`cp packages/backend/.env.example packages/backend/.env`

Start the Backend Nest server: `yarn dev:backend` 

(If you've previously used create-originate-app to create a application with the same name, you'll need to remove the database docker container from the previous run)





