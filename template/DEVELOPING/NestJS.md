# NestJS

NestJS powers the backend API server in the `backend` sub-package. It's worth
reading through the [NestJS docs][]. What follows is a very high-level summary.

[nestjs docs]: https://docs.nestjs.com/

Nest provides batteries-included [GraphQL][] and [REST][] frameworks. (We
encourage use of the GraphQL framework). It also provides a module and
dependency injection system, and everything about Nest revolves around that
system.

[graphql]: https://docs.nestjs.com/graphql/quick-start
[rest]: https://docs.nestjs.com/controllers

> ℹ️ Nest modules are distinct from ES modules. In TypeScript every source file
> is a module with imports and exports. On the other hand a Nest module is
> a class that implements a specific API, and that provides references to pieces
> of app functionality (which are usually also classes).

## Modules

A Nest **module** is a class with the `@Module()` annotation. Related units of
app functionality (which Nest calls **providers**) are registered with a module.
Everything that is registered with a module can be automatically wired into
a larger app with two lines of code. A module can provide GraphQL sub-graphs,
REST controllers, middleware, TypeORM database entities, and much more.

COA includes an example recipes feature. The backend portion of this feature
(except for a migration and an e2e test) is wrapped up in a module in
[`recipes.module.ts`](../packages/backend/src/recipes/recipes.module.ts). By
including this module the app gets database tables for the `Ingredient` and
`Recipe` entity types, a GraphQL sub-graph specified in `RecipeResolver` and
`IngredientResolver`, and services (`RecipeService` and `IngredientService`)
which provide business logic that is called by the recipes API.

Every Nest app has a root module. In COA that is
[`app.module.ts`](../packages/backend/src/app.module.ts). All functionality from
`recipes.module.ts` is wired into the main app by importing `RecipesModule`, and
including it in the `imports: [...]` section in `AppModule`'s `@Module`
annotation. Nest encourages developers split features into separate modules to
clearly delineate areas of responsibility. The modular system also makes it easy
to import functionality from other packages, and makes it easy to delete the
recipes feature when you are done looking at it.
