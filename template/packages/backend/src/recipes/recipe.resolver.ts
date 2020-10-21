import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GetRecipesArgs } from "./dto/get-recipes.args"
import { NewRecipeInput } from "./dto/new-recipe.input"
import { Recipe } from "./models/recipe.entity"
import { RecipeService } from "./recipe.service"

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

  // GraphQL can retrieve values from simple entity properties that have
  // `@Field` annotations. But some properties require logic; in those cases we
  // use a `@ResolveField` resolver method. Here the `user` and
  // `ingredients` fields require follow-up database queries.
  //
  // We want to batch those queries to avoid the N+1 query problem, so we also
  // use the `@Loader` annotation to inject `DataLoader` instances that
  // automatically batch lookups.

  // @ResolveField(_returns => User, { description: "author of the recipe" })
  // @Loader(RecipeService.ownerLoader, { maxBatchSize: 1000 })
  // async user(@Root() recipe: Recipe) {
  //   return (dataloader: FromLoadFn<typeof RecipeService.ownerLoader>) =>
  //     dataloader.load(recipe.id)
  // }

  // The `@Loader` annotation is the explicit / general-purpose way to use
  // `DataLoader`. In cases where the only thing the loader does is to retrieve
  // related database entities we could alternatively use the `@TypeormLoader`
  // annotation on the entity property instead of using a `@ResolveField`
  // method.

  // @ResolveField(_returns => [Ingredient])
  // @Loader(RecipeService.ingredientsLoader, { maxBatchSize: 1000 })
  // async ingredients(@Root() recipe: Recipe) {
  //   return (dataloader: FromLoadFn<typeof RecipeService.ingredientsLoader>) =>
  //     dataloader.load(recipe.id)
  // }
}

// type FromLoadFn<Fn> = Fn extends DataLoader.BatchLoadFn<infer K, infer V>
//   ? DataLoader<K, V>
//   : never
