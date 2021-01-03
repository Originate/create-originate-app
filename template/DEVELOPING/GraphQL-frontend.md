# GraphQL, Running Queries from React Code

The React frontend uses [Apollo Client][] to dispatch GraphQL queries. What is
nice about Apollo Client is that it understands GraphQL conventions, and stores
response data in a normalized cache. That provides general-purpose state
management that let's you skip writing most of the React state management code
you would otherwise write to accompany API requests.

[apollo client]: https://www.apollographql.com/docs/react/

Queries are written in the GraphQL query language, but are embedded in
TypeScript files using `gql` template tags. We have tooling in place via
a TypeScript compiler plugin, and an ESLint plugin to check queries, and to
provide interactive feedback in your IDE. We also have a system of code
generation that allows TypeScript to infer accurate types for API response data,
and for query variables.

## Writing a Query

GraphQL queries are written in `gql` template tags, and are dispatched using
React hooks. Here is a basic example,

```tsx
import { gql, useQuery } from "@apollo/client"

const getRecipesQuery = gql`
  query GetRecipes {
    recipes {
      id
      title
      description
    }
  }
` as import("./__generated__/get-recipes").GetRecipesDocument

function RecipesList() {
  const { data, error, loading } = useQuery(getRecipesQuery)
  //      ^
  //      inferred type is { recipes: { id: string, title: string, ... }[] } | undefined

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {data.recipes.map(recipe => (
        <li>
          {recipe.title} &mdash; {recipe.description}
        </li>
      ))}
    </ul>
  )
}
```

See [Apollo Client][]'s documentation for usage details.

> ⚠ Try to include the `id` field in every type that you request - Apollo needs
> that information for its normalized cache.

See this obnoxious-looking bit?

```ts
as import("./__generated__/get-recipes").GetRecipesDocument
```

That is a type assertion that makes the type inference work. But you don't have
to write it by hand. Run `yarn lint --fix` after writing a query, and the
assertion will be inserted automatically. The assertion loads types from an
automatically-generated module. As long as you have the frontend dev server
running those modules will be automatically created or updated whenever you make
code changes.

## Queries from the Browser vs Server-Side Rendering

In most cases GraphQL queries will be dispatched from the browser directly to
the backend API server. But we have a frontend server powered by Next.js that is
capable of server-side rendering (SSR), and it is possible to dispatch GraphQL
queries from the frontend server so that data is populated before a page is sent
to the browser. ([See
here](https://www.freecodecamp.org/news/how-to-fetch-graphql-data-in-next-js-with-apollo-graphql/).)
But that makes things more complicated, and we have not yet had a compelling
case to support frontend server-to-backend server queries in
create-originate-app.

You can use SSR to render components that fetch data via GraphQL. If the
frontend server is not set up to perform that fetch then the server will render
the page in its loading state. Once the page is loaded in the browser, the
browser will take over fetching and filling in dynamic data.
