import { NewIngredientInput } from "../dto/new-ingredient.input";
import { Ingredient } from "../models/ingredient.entity";
import { IngredientService } from "./ingredient.service";
export declare class IngredientResolver {
    private ingredientService;
    constructor(ingredientService: IngredientService);
    addIngredient(ingredient: NewIngredientInput): Promise<Ingredient>;
}
//# sourceMappingURL=ingredient.resolver.d.ts.map