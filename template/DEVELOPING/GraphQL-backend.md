# GraphQL, Implementing an API

Create-originate-app sets up a backend powered by NestJS which supports GraphQL
and REST APIs out-of-the-box. But we encourage GraphQL APIs especially because
they simplify React code.

For a general-purpose introduction to GraphQL see
[graphql.org](https://graphql.org/learn/).

For a complete introduction to NestJS' support for GraphQL see the [NestJS
documentation][]. It describes code-first and schema-first methods;
create-originate-app is designed to use the **code-first** method.

For high-level pointers and details specific to create-originate-app, read on.
Because so much has already been written about GraphQL this page only includes
enough details to cover some key terminology to orient discussion, to provide
some high-level pointers of the NestJS take on GraphQL, and to point out
specific design decisions in create-originate-app.

## tl;dr

A GraphQL API is a collection of types. Those types can be **object types**,
**input types**, or custom **scalar types** to supplement the built-in scalar
types. The API graph (and by extension the universe of possible queries) is
entirely determined by types of fields in object types, starting from the **root
type**.

The full API is _declared_ in a **schema** which defines all of the types but
does not contain any implementation code. The API is _implemented_ with object
type classes, input type classes, and resolver classes. Create-originate-app
uses a **code-first** method where the schema is automatically generated based
on implementation code and annotations.

## Object Types

When you get down to it, a GraphQL API is a collection of **types**. The most
prominent of these are **object types** which are the non-primitive types that
are served by the API. Object types map to JSON objects in API responses. In
GraphQL terminology on object type has **fields** which correspond to JSON
properties.

Create-originate-app populates new projects with the [Recipe][] type. Here is
the code for that type with all non-GraphQL-related annotations removed,

[recipe]: ../packages/backend/src/recipes/models/recipe.entity.ts

```ts
@ObjectType()
export class Recipe {
  @Field(_type => ID)
  id!: number

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field()
  title!: string

  @Field({ nullable: true })
  description?: string
}
```

A GraphQL object type is implemented as a TypeScript class; annotations define
how the `Recipe` type will be presented in API responses. The entire class
must have the `@ObjectType()` annotation. Each property to be directly
exposed through the API gets a `@Field()` annotation which accept an option for
overriding the GraphQL API type of the field. If a client requests a recipe with
all of its fields then an instance of the `Recipe` class (or
a structurally-compatible object) will be converted to JSON with all of the
annotated fields included. Any properties that don't have a `@Field()`
annotation are **not** included in API responses.

> ℹ️ GraphQL has its own set of primitive types that don't completely overlap
> with TypeScript's primitive types; so it's important to be able to explicitly
> specify the GraphQL API type for a field when you need to. (In GraphQL
> parlance primitive types are called **scalar types**.) For example GraphQL
> distinguishes between `Int` and `Float` types, and does some automatic
> verification to ensure that inputs and outputs match the declared types.
>
> In pretty much every object type there will be a field that has the `ID` type.
> This is an alias for GraphQL's `String` type - but it carries an implication
> that a value of type `ID` can be used to look up records.

`@Field()` accepts additional options to provide documentation that can be read
by clients via an introspection API, to indicate that a field is nullable, to
give the field a different name in the API compared to its name in TypeScript
code, etc.

NestJS infers a GraphQL API type from the class and annotations. Represented in
the GraphQL schema language the API type for `Recipe` looks like this,

```graphql
type Recipe {
  createdAt: DateTime! # exclamation marks mean the type is non-nullable
  description: String
  id: ID!
  title: String!
  updatedAt: DateTime!
}
```

### GraphQL object types are also database entity classes

Object type classes are often not instantiated directly. (You might have noticed
that `Recipe` has no constructor.) In the most common case an object type maps
to a database table, and we use one class with both GraphQL and TypeORM
annotations to represent both concepts. You can see that in the full definition
of [Recipe][]. But it's also possible to define an object type class that is not
a database entity. When constructing API responses you can instantiate your
class, or you can write an object literal that is structurally-compatible with
the class definition (has the same properties with compatible types), or you can
use any other value with a type that is assignable to the class type.

## The Root Type

So how does a client request a recipe? Every GraphQL API has a root type (which
is always an object type). When a client runs a query it implicitly requests the
root object, and specifies which fields of the root object it wants. The root
object is an abstract concept - it has no meaningful value, and there is no root
object TypeScript class. But we can write methods that define fields on the root
object (more on that later) and those fields can be of type `Recipe` or
`[Recipe!]!` (non-nullable list of non-nullable recipe values). For example with
this root type (as expressed in the GraphQL schema language),

```graphql
# Type for the root object
type Query {
  recipes: [Recipe!]!
}
```

a client can get recipes by requesting the `recipes` field of the root object
(and in turn requesting fields for each recipe, such as `id` and `name`),

```graphql
query AllRecipes {
  recipes {
    id
    name
  }
}
```

If you're running the backend dev server you can find the GraphQL Playground at
https://localhost:4000/graphql. Paste in the query above, and see what happens!

> ℹ️ Actually because there are three types of GraphQL queries (`query`,
> `mutation`, and `subscription`) there are three root objects, and each has its
> own type. Those are usually called `Query`, `Mutation`, and `Subscription`.

## Input Types

In addition to object types GraphQL has **input types**. These are just like
object types except that they are received from the client. Input types are
useful for cases like creating new values. Here is [NewRecipeInput][],

[newrecipeinput]: ../packages/backend/src/recipes/dto/new-recipe.input.ts

```ts
@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title!: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string

  @Field(_type => [ID], { nullable: true })
  ingredientIDs?: string[]
}
```

NestJS automatically validates inputs with [class-validator][] which is what
provides validation annotations like `@MaxLength` and `@IsOptional`.

[class-validator]: https://www.npmjs.com/package/class-validator

> ℹ️ Output types are only allowed in server responses, input types are only
> allowed in client queries. In REST it's not uncommon to reuse one type for
> input and output. But GraphQL has a strict separation.

So where do input objects appear in queries? Object type fields can accept
arguments (as seen in the next section). The type for an argument can be
a scalar, or it can be an input type (or a list of either). Queries can include
JSON objects for field arguments if the objects are structurally assignable to
the input types of those arguments.

## Schema

Every GraphQL API has a **schema** which is a declaration of all of the types
that can appear in API responses, or that are accepted as inputs.
Create-originate-app uses a **code-first** approach which means that the schema
is automatically generated based on the TypeScript code that **implements** the
API. Whenever you have the dev server or e2e tests running the file
`packages/backend/schema.graphql` will automatically update with the current
schema as you update code.

## Resolvers

We need to be able to specify fields for the root types even though there is no
class for the root type. And to make a non-trivial API we need to be able to
define dynamic fields that have logic beyond responding with class properties,
and that can accept arguments to customize responses. So NestJS supports
**resolver** classes. Here is a basic resolver that accompanies the `Recipe`
type,

```ts
@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(_returns => [Recipe], {
    description: "Get recipes written by you, or that are publicly shared",
  })
  async recipes(
    @Args("skip") skip: number = 0,
    @Args("take") take: number = 25,
  ): Promise<Recipe[]> {
    return this.recipeService.find({ skip, take })
  }

  @Mutation(_returns => Recipe, {
    // These descriptions are reproduced in the generated schema
    description: "Create a new recipe",
  })
  async addRecipe(@Args("recipe") recipe: NewRecipeInput): Promise<Recipe> {
    return this.recipeService.create(recipe)
  }

  @ResolveField(_returns => [Ingredient])
  async ingredients(@Root() recipe: Recipe): Promise<Ingredient[]> {
    return this.recipeService.ingredientsLoader.load(recipe.id)
  }
}
```

`RecipeResolver` class attaches a field called `recipes` to the `Query` root
type. `recipes` has the same type that we described earlier, except that this
version accepts optional arguments for customizing the response.

It also attaches an `addRecipe` field to the `Mutation` root type which takes an
input object argument. This time the argument is required because the TypeScript
type for `recipe` is non-nullable, and there is no default value.

Finally the class adds an `ingredients` field to the `Recipe` object type that
can be queried in addition to the exposed class properties from the `Recipe`
TypeScript class. (The `ingredients` field is associated with the `Recipe` type
because the `@Resolver` annotation on the class mentions that type.) Resolver
methods let us define fields that don't directly map to database columns, or
that require some extra logic such as database lookups, batching, or
authentication.

> ℹ️ When writing resolvers we need to explicitly specify the GraphQL API type
> for every field. This is due to technical limitations of TypeScript
> annotations.
>
> The `@Query` annotation in the `recipes` resolver method declares that the
> `recipes` field has type `[Recipe]`, but the actual API type is `[Recipe!]!`.
> NestJS annotations helpfully assume that types are non-nullable by default so
> you don't need to fill the entire buffer with exclamation marks.

For a full resolver example see [RecipeResolver][].

[reciperesolver]: ../packages/backend/src/recipes/recipe.resolver.ts

## Wiring Up Types and Resolvers

Resolver classes must be registered with the app. This is done through the
NestJS [modules][] system: each resolver is listed as one of the `providers` of
a module. For example [RecipesModule][] looks like this,

[modules]: ./NestJS.md#modules
[recipesmodule]: ../packages/backend/src/recipes/recipes.module.ts

```ts
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

Both `RecipeResolver` and `IngredientResolver` are wired in there. You might
have noticed that the `RecipeResolver` constructor requires a `RecipeService`
instance - that is another class that has methods for database lookups, inserts,
etc. Think of resolvers as **controllers**, and of services as **models**. We
can keep things cleaner if those responsibilities are kept in separate classes.
Because the service classes are injected into resolvers they need to be
registered as `providers` too.

> ℹ️ This line registers database entities,
>
>     imports: [TypeOrmModule.forFeature([Ingredient, Recipe])],
>
> If your object type classes are also database entity classes then you'll need
> to list them in a line like this one. OTOH if you have object types that are
> not database entities they don't need to be registered - NestJS will find
> object types through references from resolvers. You don't need to register
> input types or dedicated arguments classes either.

## Solving the N+1 Problem with DataLoader

GraphQL handles API requests recursively, following roughly these steps:

1. Get the root object (the actual value doesn't matter, it's often `null`).
2. For every requested field on that object, run the corresponding resolver
   method to fill in a value.
3. For every resolved value that is an object type, go to step 2 and proceed
   with this object.

This process is flexible: the logic for fulfilling queries is split into
independent pieces that can be run as needed to produces custom responses. But
it can also lead to inefficient database access. Imagine a query requests a list
of recipes with ingredients for each recipe.

```graphql
query GetRecipes {
  recipes {
    id
    name
    ingredients {
      id
      name
    }
  }
}
```

A naïve implementation looks like this,

```ts
@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  // Runs once to produce the requested list of recipes
  @Query(_returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    // Runs a database `select`
    return this.recipeService.find({ skip, take })
  }

  // Runs once for **each** recipe
  @ResolveField(_returns => [Ingredient])
  async ingredients(@Root() recipe: Recipe): Promise<Ingredient[]> {
    // Runs a database `select`
    return this.recipeService.findIngredients({ recipeId: recipe.id })
  }
}
```

Every recipe is an object type; according to the recursive algorithm every
recipe triggers a jump to step 2, which results in running the `ingredients`
resolver method once for each recipe. If the query produces N recipes then it
must run N+1 database queries - one to get the list of recipes, and one for each
recipe to get the list of ingredients for that recipe. This can get out of hand
fast if your API graph is any deeper because every layer multiplies the number
of database queries.

An efficient solution would run one or two database queries. Something like,

```sql
SELECT id, name, description FROM recipe;

SELECT id, name, recipeId FROM ingredient
JOIN recipe_ingredients_ingredient ON ingredientId = ingredient.id
JOIN recipe ON recipe.id = recipeId
WHERE recipe.id IN (${recipes.map(r => r.id)});
```

That gets a big list of ingredients for all of the selected recipes. We can
split up the list in TypeScript to match ingredients to recipes.

We can get to the two-query solution in GraphQL by batching database queries
using [DataLoader][]. The `ingredients` resolver method looks almost the same as
before,

[dataloader]: https://github.com/graphql/dataloader

```ts
@ResolveField(_returns => [Ingredient])
async ingredients(@Root() recipe: Recipe): Promise<Ingredient[]> {
  return this.recipeService.ingredientsLoader.load(recipe.id)
}
```

The difference is that we call the `load` method of a `DataLoader` instance
which is defined in `RecipeService` like this,

```ts
@Injectable({ scope: Scope.REQUEST })
export class RecipeService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  // A data loader batches multiple lookups that may occur during one GraphQL
  // request. The batch function accepts an array of lookup keys, and must
  // resolve with an array of results or errors in the same order.
  ingredientsLoader = new DataLoader<number, Ingredient[]>(
    async recipeIds => {
      const ingredients = await this.manager
        .createQueryBuilder(Ingredient, "ingredient")
        .innerJoin("ingredient.recipes", "recipe")
        .where("recipe.id IN (:...recipeIds)", { recipeIds })
        .getMany()
      return recipeIds.map(id => filter(ingredients, { id }))
    },
    { maxBatchSize: 1000 },
  )

  // ...
}
```

When a resolver calls `ingredientsLoader.load(id)` the given `id` is appended to
a list that will be processed in one batch in the next event loop tick. We can
write any function we want to handle the batch as long as it accepts a list of
IDs, and returns a list of values in the same order. The implementation here
uses the TypeORM query builder to construct one query to fetch ingredients for
all recipes at once in a way that pretty much matches the SQL snippet above.

### One DataLoader instance per request

**There are two critical details** to note when using DataLoader! If two GraphQL
requests arrive at about the same time it's possible the server will run
resolvers for both requests before any DataLoader batches are scheduled (or at
least to be safe we should assume that is possible). It is important that we do
not run lookups from different requests in the same batch. To avoid this we want
to create a new DataLoader instance for each loader for each incoming request.

All service classes have an `@Injectable()` annotation which allows instances to
be injected into other class constructors, such as into resolver classes. The
first detail is that a service that has loaders should be configured with
request scope like this,

```ts
@Injectable({ scope: Scope.REQUEST })
```

By default NestJS creates one instance of each injectable class for the lifetime
of the program, and reuses it wherever an instance of that class is needed.
Specifying request scope causes NestJS to instead create one instance for each
request - just what we want!

> ℹ️ Request scope infects the scope of other classes in NestJS' module system.
> `RecipeResolver`'s constructor requires an injected instance of
> `RecipeService`; so making `RecipeService` request-scoped causes
> `RecipeResolver` to also be request-scoped. This isn't a problem, just
> something to be aware of.

The second detail is that a service class should be written so that a new
`DataLoader` instance is created for every service class instance.
`RecipeService` uses a static property initializer,

```ts
class RecipeService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  ingredientsLoader = new DataLoader<number, Ingredient[]>(...)

  // ...
}
```

A static initializer is syntactic sugar that is equivalent to assigning
a property value inside the constructor,

```ts
class RecipeService {
  ingredientsLoader: DataLoader<number, Ingredient[]>

  constructor(@InjectEntityManager() private manager: EntityManager) {
    this.ingredientsLoader = new DataLoader<number, Ingredient[]>(...)
  }

  // ...
}
```

It's important to reuse one DataLoader instance for the lifetime of each service
class instance. So defining a loader inside a method won't work well,

```ts
class RecipeService {

  // Don't do this!
  async findIngredients(recipeId: number): Promise<Ingredient[]> {
    return new DataLoader<number, Ingredient[]>(async recipeIds => { ... })
  }

}
```
