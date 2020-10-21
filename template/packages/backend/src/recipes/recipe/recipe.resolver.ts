import { Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class RecipeResolver {
  @Query(_returns => String)
  hello() {
    return "world"
  }
}
