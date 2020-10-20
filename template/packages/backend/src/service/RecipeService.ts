import { Max, Min } from "class-validator"
import DataLoader from "dataloader"
import { filter, find } from "lodash"
import { ArgsType, Field, ID, Int } from "type-graphql"
import { getManager, Like } from "typeorm"
import { Ingredient } from "../entity/Ingredient"
import { Recipe } from "../entity/Recipe"
import { User } from "../entity/User"
import { NewRecipeInput } from "../input/NewRecipeInput"

export class RecipeService {
  // A data loader batches multiple lookups that may occur during one GraphQL
  // request. The batch function accepts an array of lookup keys, and must
  // resolve with an array of results or errors in the same order.
  static ownerLoader: DataLoader.BatchLoadFn<
    number,
    User
  > = async recipeIds => {
    const users = await getManager()
      .createQueryBuilder(User, "user")
      .innerJoin("user.recipes", "recipe")
      .where("recipe.id IN (:...recipeIds)", { recipeIds })
      .getMany()
    return recipeIds.map(
      id =>
        find(users, { id }) ??
        new Error(`Could not find owner for recipe ${id}`),
    )
  }

  static ingredientsLoader: DataLoader.BatchLoadFn<
    number,
    Ingredient[]
  > = async recipeIds => {
    const ingredients = await getManager()
      .createQueryBuilder(Ingredient, "ingredient")
      .innerJoin("ingredient.recipes", "recipe")
      .where("recipe.id IN (:...recipeIds)", { recipeIds })
      .getMany()
    return recipeIds.map(id => filter(ingredients, { id }))
  }

  async findById(id: string): Promise<Recipe | undefined> {
    return getManager().findOne(Recipe, id)
  }

  async find({ title, userId, skip, take }: GetRecipesArgs): Promise<Recipe[]> {
    return getManager().find(Recipe, {
      where: {
        ...(userId ? { userId } : null),
        ...(title ? { title: Like(title) } : null),
      },
      skip,
      take,
      order: { title: "ASC", createdAt: "DESC" },
    })
  }

  async findByUserId(userId: string): Promise<Recipe[]> {
    return getManager().find(Recipe, {
      where: { userId },
      order: { title: "ASC", createdAt: "DESC" },
    })
  }

  async create(recipe: NewRecipeInput): Promise<Recipe> {
    const manager = getManager()
    const ingredients = await manager.findByIds(
      Ingredient,
      recipe.ingredientIDs,
    )
    return getManager().create(Recipe, { ...recipe, ingredients })
  }
}

@ArgsType()
export class GetRecipesArgs {
  @Field(_type => Int, { defaultValue: 0 })
  @Min(0)
  skip!: number

  @Field(_type => Int)
  @Min(1)
  @Max(50)
  take = 25

  @Field({ nullable: true })
  title?: string

  @Field(_type => ID, { nullable: true })
  userId?: string
}
