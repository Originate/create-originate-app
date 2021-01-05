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

```
@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Recipe])],
  providers: [
    RecipeResolver,
    RecipeService,
    IngredientResolver,
    IngredientService,
  ],
})
export class RecipesModule {}
```

> ℹ️ A module can declare **providers**, **imports**, and **exports**. See
> [the docs][modules] for details. Here is a quick reference:
>
> - Providers are classes, factory functions, or singleton values that can be
>   automatically injected into other providers that are declared in the same
>   module. Providers can implement independent functionality, such as resolver
>   classes which extend the app's GraphQL schema. The most common examples of
>   providers are classes with a `@Resolver` or an `@Injectable` annotation.
>
> - Imports are references to other modules. Importing a module wires in
>   resolvers and database entities from that module. Every module you want to
>   use in your app needs to be imported either directly or transitively into
>   the root module, [AppModule][]. Modules can be produced by factory
>   functions, such as `TypeOrmModule.forFeature()`.
>
> - Exports are providers that are intended for use in other modules. Usually
>   a provider can only be injected into another provider that is declared in
>   the same module - but if module A exports provider P, and module B imports
>   module A, then providers declared in module B can inject provider P.
>   (Providers declared in module A can also inject provider P.) An exported
>   provider appears in both the providers and exports lists in the module where
>   it is declared.

[appmodule]: ../packages/backend/src/app.module.ts

Every Nest app has a root module. In COA that is
[`app.module.ts`](../packages/backend/src/app.module.ts). All functionality from
`recipes.module.ts` is wired into the main app by importing `RecipesModule`, and
including it in the `imports: [...]` section in `AppModule`'s `@Module`
annotation. Nest encourages developers split features into separate modules to
clearly delineate areas of responsibility. The modular system also makes it easy
to import functionality from other packages, and makes it easy to delete the
recipes feature when you are done looking at it.

Nest publishes packages that integrate a number of libraries into its module
system. For example we use `@nestjs/typeorm` to automatically wire TypeORM
entity classes into the app, and to allow TypeORM repositories to be injected
into app code.

> ℹ️ You might wonder why database entities, like the `Ingredient` and `Recipe`
> classes, are not listed as providers like resolver classes are. Instead
> entities are listed in an import created by `TypeOrmModule.forFeature()`.
> Partly that is because NestJS has native support for resolvers; TypeORM was
> not originally designed for NestJS so there is some compatibility logic
> involved.

For more details see the NestJS documentation on [modules][].

[modules]: https://docs.nestjs.com/modules
