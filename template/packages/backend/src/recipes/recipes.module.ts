import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Ingredient } from "./models/ingredient.entity"
import { Recipe } from "./models/recipe.entity"
import { RecipeResolver } from "./recipe.resolver"
import { RecipeService } from "./recipe.service"

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Recipe])],
  providers: [RecipeResolver, RecipeService],
})
export class RecipesModule {}
