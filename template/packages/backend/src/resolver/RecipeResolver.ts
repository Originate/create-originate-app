import {
  Arg,
  Args,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import { Ingredient } from "../entity/Ingredient"
import { Recipe } from "../entity/Recipe"
import { User } from "../entity/User"
import { GetRecipesArgs, RecipeService } from "../service/RecipeService"

@Resolver(_of => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(_returns => Recipe, {
    description: "Get a recipe by its ID",
  })
  async recipe(@Arg("id", _type => ID) id: string): Promise<Recipe> {
    const recipe = await this.recipeService.findById(id)
    if (!recipe) {
      throw new Error(`recipe not found, ${id}`)
    }
    return recipe
  }

  @Query(_returns => [Recipe], {
    description: "Get recipes written by you, or that are publicly shared",
  })
  async recipes(@Args() args: GetRecipesArgs) {
    return this.recipeService.find(args)
  }

  @FieldResolver(_returns => User, { description: "author of the recipe" })
  async user(@Root() recipe: Recipe) {}

  @FieldResolver(_returns => [Ingredient])
  async ingredients() {}
}
