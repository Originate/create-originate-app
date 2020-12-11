import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Ingredient } from "./models/ingredient.entity"
import { Recipe } from "./models/recipe.entity"
import { RecipeResolver } from "./recipe.resolver"
import { RecipeService } from "./recipe.service"
import { IngredientResolver } from "./ingredient/ingredient.resolver"
import { IngredientService } from "./ingredient/ingredient.service"

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Recipe])],
  providers: [
    RecipeResolver,
    RecipeService,
    IngredientResolver,
    IngredientService,
  ],
})
export class RecipesModule {}
