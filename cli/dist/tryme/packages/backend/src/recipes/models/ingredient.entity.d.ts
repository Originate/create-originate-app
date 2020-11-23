import { Recipe } from "./recipe.entity";
export declare enum IngredientCategory {
    DAIRY = "dairy",
    FRUIT = "fruit",
    MEAT = "meat",
    NUT = "nut",
    VEGETABLE = "vegetable"
}
export declare class Ingredient {
    id: number;
    name: string;
    category: IngredientCategory;
    recipes?: Recipe[];
}
//# sourceMappingURL=ingredient.entity.d.ts.map