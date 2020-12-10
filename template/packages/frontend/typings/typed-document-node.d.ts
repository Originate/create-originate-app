/*
 * Ok, are you ready for this? The short version is that we should be able to
 * delete this file when Apollo is updated so that it's hook functions (such as
 * `useQuery`) have signatures for consuming the [`TypedQueryDocumentNode`][]
 * type from `graphql`.
 *
 * [`TypedQueryDocumentNode`]: https://github.com/graphql/graphql-js/blob/master/src/utilities/typedQueryDocumentNode.d.ts
 *
 * You're still reading? You want the long version? Here goes! Parsed GraphQL
 * queries get the type `DocumentNode` which comes from the `graphql` library.
 * That type represents a GraphQL AST. Usually a `` gql`...` `` template tag
 * expression has the `DocumentNode` type. The problem is that type doesn't
 * communicate anything about the shape of data that the GraphQL server will
 * respond with when the query is executed, or the types of variables required by
 * the query. We know that stuff at compile time - it would be super useful to
 * encode it in the type of the query expression so that information can flow
 * into code that executes the query.
 *
 * GraphQL added the `TypedQueryDocumentNode` type which extends `DocumentNode`
 * but allows us to use the phantom types pattern to stick extra type info into
 * type parameters. The full type looks like this:
 *
 *     TypedQueryDocumentNode<ResponseData, Variables>
 *
 * We can use a type assertion to cast `` gql`...` `` expressions to the
 * `TypedQueryDocumentNode` type, and capture query metadata types in those type
 * argument positions. For example:
 *
 *     const someQuery = gql`
 *       query SomeQuery($someVar: String!) {
 *         someField(something: $someVar) {
 *           id,
 *           someValue
 *         }
 *       }
 *     ` as TypedQueryDocumentNode<
 *       { someField: { id: string, someValue: number } },
 *       { someVar: string }
 *     >
 *
 * Now we run into another problem: `TypedQueryDocumentNode` is very new - it was
 * added in `graphql` v15.4.0 - and libraries haven't yet updated to consume it
 * so they don't benefit from the extra type information. (An added wrinkle is
 * that importing this type introduces a minimum version constraint on `graphql`
 * which will discourage library authors from using the type for a while.)
 *
 * But there is hope! `TypedQueryDocumentNode` is based on a type called
 * [`TypedDocumentNode`][] from a third-party package,
 * `@graphql-typed-document-node/core`. That package was made by the GraphQL
 * Code Generator team as a way to get a common type in use until GraphQL adopted
 * their own version. (Did you know that Jesse was the one to originally suggest
 * the `TypedDocumentNode` idea to the GraphQL Code Generator team? Thankfully
 * they had the follow-through to make it happen :)) Since it comes from
 * a third-party package libraries *can* import `TypedDocumentNode` without
 * losing support for slightly older versions of `graphql`. In fact Apollo Client
 * does this, and can already consume `TypedDocumentNode`, and magically hooks up
 * type inference!
 *
 * [`TypedDocumentNode`]: https://github.com/dotansimha/graphql-typed-document-node/blob/master/packages/core/src/index.ts
 *
 * I mentioned that we can add a type assertion on `` gql`...` `` expressions to
 * hook up all the types. Writing types by hand, and putting in type assertions
 * by hand would be a pain. So we have `ts-graphql-plugin` to generate types
 * automatically, and an eslint autofix in `@originate/eslint-plugin-ts-graphql`
 * to put in the type assertions automatically. Jesse asked the author of
 * ts-graphql-plugin to include a `TypedDocumentNode` type in generated types for
 * this purpose because Apollo already supports it. After
 * [some discussion](https://github.com/Quramy/ts-graphql-plugin/pull/230)
 * an agreement was reached to emit `TypedQueryDocumentNode` types instead since
 * coming from the `graphql` package makes that type more official.
 *
 * Now we come to the type definition below. We have `TypedQueryDocumentNode`
 * types that are generated automatically, but Apollo only understands
 * `TypedDocumentNode`. Despite having the same purpose, these types are written
 * such that they are not structurally compatible with each other. Zut Alors!
 * But because these are just types we can fix things with this sneaky type
 * definition file. The definition below augments `TypedDocumentNode` so that it
 * *is* structurally compatible with `TypedQueryDocumentNode`. Now when Apollo
 * gets a value of type `TypedQueryDocumentNode` it applies its signature
 * overload for `TypedDocumentNode` (because we've made the types compatible),
 * and type inference works correctly. Hooray!
 */

import { DocumentNode } from "graphql"

declare module "@graphql-typed-document-node/core" {
  export interface TypedDocumentNode<
    Result = {
      [key: string]: any
    },
    Variables = {
      [key: string]: any
    }
  > extends DocumentNode {
    /**
     * This type is used to ensure that the variables you pass in to the query
     * are assignable to Variables and that the Result is assignable to whatever
     * you pass your result to. The method is never actually implemented, but the
     * type is valid because we list it as optional
     */
    __ensureTypesOfVariablesAndResultMatching?: (variables: Variables) => Result
  }
}
