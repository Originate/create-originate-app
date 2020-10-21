import { Injectable } from "@nestjs/common"
import DataLoader from "dataloader"
import { filter } from "lodash"
import { getManager, getRepository, Like } from "typeorm"
import { GetRecipesArgs } from "./dto/get-recipes.args"
import { NewRecipeInput } from "./dto/new-recipe.input"
import { Ingredient } from "./models/ingredient.entity"
import { Recipe } from "./models/recipe.entity"

@Injectable()
export class RecipeService {
  // A data loader batches multiple lookups that may occur during one GraphQL
  // request. The batch function accepts an array of lookup keys, and must
  // resolve with an array of results or errors in the same order.
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
    const ingredients = recipe.ingredientIDs
      ? await manager.findByIds(Ingredient, recipe.ingredientIDs)
      : []
    return getRepository(Recipe).save({ ...recipe, ingredients })
  }
}
