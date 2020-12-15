# Developing

The COA framework consists of two sub-packages which each run a server. There is
a **backend** API server, and a **frontend** server that serves React code.

## Documentation Contents

- [Environment Variables](./environment-variables.md)
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
