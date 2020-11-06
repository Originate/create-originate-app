import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Root,
} from "@nestjs/graphql"
import { GetRecipesArgs } from "./dto/get-recipes.args"
import { NewRecipeInput } from "./dto/new-recipe.input"
import { Recipe } from "./models/recipe.entity"
import { RecipeService } from "./recipe.service"
import { Ingredient } from "./models/ingredient.entity"

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(_returns => Recipe, {
    description: "Get a recipe by its ID",
  })
  async recipe(@Args("id", { type: () => ID }) id: string): Promise<Recipe> {
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

  @Mutation(_returns => Recipe)
  async addRecipe(@Args("recipe") recipe: NewRecipeInput): Promise<Recipe> {
    return this.recipeService.create(recipe)
  }

  @Mutation(_returns => Boolean)
  async deleteRecipe(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.recipeService.delete(id)
  }

  // GraphQL can retrieve values from simple entity properties that have
  // `@Field` annotations. But some properties require logic; in those cases we
  // use a `@ResolveField` resolver method. Here the `user` and
  // `ingredients` fields require follow-up database queries.
  //
  // We want to batch those queries to avoid the N+1 query problem, so we use
  // a data loader.

  @ResolveField(_returns => [Ingredient])
  async ingredients(@Root() recipe: Recipe): Promise<Ingredient[]> {
    return this.recipeService.ingredientsLoader.load(recipe.id)
  }
}
