"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipesModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var ingredient_entity_1 = require("./models/ingredient.entity");
var recipe_entity_1 = require("./models/recipe.entity");
var recipe_resolver_1 = require("./recipe.resolver");
var recipe_service_1 = require("./recipe.service");
var ingredient_resolver_1 = require("./ingredient/ingredient.resolver");
var ingredient_service_1 = require("./ingredient/ingredient.service");
var RecipesModule = /** @class */ (function () {
    function RecipesModule() {
    }
    RecipesModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([ingredient_entity_1.Ingredient, recipe_entity_1.Recipe])],
            providers: [recipe_resolver_1.RecipeResolver, recipe_service_1.RecipeService, ingredient_resolver_1.IngredientResolver, ingredient_service_1.IngredientService]
        })
    ], RecipesModule);
    return RecipesModule;
}());
exports.RecipesModule = RecipesModule;
//# sourceMappingURL=recipes.module.js.map