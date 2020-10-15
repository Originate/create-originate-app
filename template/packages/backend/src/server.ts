import { ApolloServer } from "apollo-server"
import type { GraphQLSchema } from "graphql"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { getConnection } from "typeorm"
import type { Env } from "./env"

export async function initializeServer(env: Env, schema: GraphQLSchema) {
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
  return server
}
