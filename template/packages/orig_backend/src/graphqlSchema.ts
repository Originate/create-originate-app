import { buildSchema } from "type-graphql"
import { RecipeResolver } from "./resolver/RecipeResolver"
import { printSchema, GraphQLSchema } from "graphql"
import debug from "debug"

export async function initializeSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  })

  // Set `DEBUG=graphql` to output GraphQL schema when the app starts.
  debug("graphql")("# GraphQL Schema:\n" + printSchema(schema))

  return schema
}
