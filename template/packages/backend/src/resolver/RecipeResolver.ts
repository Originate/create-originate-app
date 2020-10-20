import DataLoader from "dataloader"
import {
  Arg,
  Args,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql"
import { Loader } from "type-graphql-dataloader"
import { Ingredient } from "../entity/Ingredient"
import { Recipe } from "../entity/Recipe"
import { User } from "../entity/User"
import { NewRecipeInput } from "../input/NewRecipeInput"
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

  @Mutation(_returns => Recipe)
  async addRecipe(@Arg("recipe") recipe: NewRecipeInput): Promise<Recipe> {
    return this.recipeService.create(recipe)
  }

  // GraphQL can retrieve values from simple entity properties that have
  // `@Field` annotations. But some properties require logic; in those cases we
  // use a `@FieldResolver` resolver method. Here the `user` and
  // `ingredients` fields require follow-up database queries.
  //
  // We want to batch those queries to avoid the N+1 query problem, so we also
  // use the `@Loader` annotation to inject `DataLoader` instances that
  // automatically batch lookups.

  @FieldResolver(_returns => User, { description: "author of the recipe" })
  @Loader(RecipeService.ownerLoader, { maxBatchSize: 1000 })
  async user(@Root() recipe: Recipe) {
    return (dataloader: FromLoadFn<typeof RecipeService.ownerLoader>) =>
      dataloader.load(recipe.id)
  }

  // The `@Loader` annotation is the explicit / general-purpose way to use
  // `DataLoader`. In cases where the only thing the loader does is to retrieve
  // related database entities we could alternatively use the `@TypeormLoader`
  // annotation on the entity property instead of using a `@FieldResolver`
  // method.

  @FieldResolver(_returns => [Ingredient])
  @Loader(RecipeService.ingredientsLoader, { maxBatchSize: 1000 })
  async ingredients(@Root() recipe: Recipe) {
    return (dataloader: FromLoadFn<typeof RecipeService.ingredientsLoader>) =>
      dataloader.load(recipe.id)
  }
}

type FromLoadFn<Fn> = Fn extends DataLoader.BatchLoadFn<infer K, infer V>
  ? DataLoader<K, V>
  : never
