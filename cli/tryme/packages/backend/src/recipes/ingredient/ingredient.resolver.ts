import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { NewIngredientInput } from "../dto/new-ingredient.input"
import { Ingredient } from "../models/ingredient.entity"
import { IngredientService } from "./ingredient.service"

@Resolver()
export class IngredientResolver {
  constructor(private ingredientService: IngredientService) {}

  @Mutation(_returns => Ingredient)
  async addIngredient(
    @Args("ingredient") ingredient: NewIngredientInput,
  ): Promise<Ingredient> {
    return this.ingredientService.create(ingredient)
  }
}
