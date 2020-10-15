import { ApolloServer } from "apollo-server"
import debug from "debug"
import { printSchema } from "graphql"
import { buildSchema } from "type-graphql"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { getConnection } from "typeorm"
import type { Env } from "./env"
import { RecipeResolver } from "./resolver/RecipeResolver"

export async function initializeServer(env: Env) {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  })
  const server = new ApolloServer({
    schema,
    plugins: [
      // The Loader plugin produces fresh `DataLoader` instances for each
      // request. This is required for `@Loader` annotations in resolver
      // classes, and for `@TypeormLoader` annotations in entity classes.
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  })
  await server.listen(env.PORT)
  console.log(`backend: started at http://localhost:${env.PORT}`)

  // Set `DEBUG=graphql` to output GraphQL schema when the app starts.
  debug("graphql")("# GraphQL Schema:\n" + printSchema(schema))

  return { schema, server }
}
