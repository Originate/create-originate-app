import debug from "debug"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import type { Env } from "./env"
import { RecipeResolver } from "./resolver/RecipeResolver"
import { printSchema } from "graphql"

export async function initializeServer(env: Env) {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  })
  const server = new ApolloServer({ schema })
  await server.listen(env.PORT)
  console.log(`backend: started at http://localhost:${env.PORT}`)

  // Set `DEBUG=graphql` to output GraphQL schema when the app starts.
  debug("graphql")("# GraphQL Schema:\n" + printSchema(schema))

  return { schema, server }
}
