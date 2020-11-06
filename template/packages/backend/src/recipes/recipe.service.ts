import { Injectable, Scope } from "@nestjs/common"
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm"
import DataLoader from "dataloader"
import { filter } from "lodash"
import { EntityManager, Like, Repository } from "typeorm"
import { GetRecipesArgs } from "./dto/get-recipes.args"
import { NewRecipeInput } from "./dto/new-recipe.input"
import { Ingredient } from "./models/ingredient.entity"
import { Recipe } from "./models/recipe.entity"

// This service includes data loaders - it's important to create a new instance
// of each data loader for each API request. Therefore we need to set the
// injectable scope for this service to `Scope.REQUEST`.
@Injectable({ scope: Scope.REQUEST })
export class RecipeService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  // A data loader batches multiple lookups that may occur during one GraphQL
  // request. The batch function accepts an array of lookup keys, and must
  // resolve with an array of results or errors in the same order.
  ingredientsLoader = new DataLoader<number, Ingredient[]>(
    async recipeIds => {
      const ingredients = await this.manager
        .createQueryBuilder(Ingredient, "ingredient")
        .innerJoin("ingredient.recipes", "recipe")
        .where("recipe.id IN (:...recipeIds)", { recipeIds })
        .getMany()
      return recipeIds.map(id => filter(ingredients, { id }))
    },
    { maxBatchSize: 1000 },
  )

  async findById(id: string): Promise<Recipe | undefined> {
    return this.manager.findOne(Recipe, id)
  }

  async find({ title, userId, skip, take }: GetRecipesArgs): Promise<Recipe[]> {
    return this.manager.find(Recipe, {
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
    return this.manager.find(Recipe, {
      where: { userId },
      order: { title: "ASC", createdAt: "DESC" },
    })
  }

  async create(recipe: NewRecipeInput): Promise<Recipe> {
    const manager = this.manager
    const ingredients = recipe.ingredientIDs
      ? await manager.findByIds(Ingredient, recipe.ingredientIDs)
      : []
    return this.recipeRepository.save({ ...recipe, ingredients })
  }

  /*
   * Deletes a recipe, returns `true` on success or `false` if the recipe row
   * was not found.
   */
  async delete(id: string): Promise<boolean> {
    let deleteResult = await this.recipeRepository.delete(id)
    return deleteResult.affected === 1
  }
}
