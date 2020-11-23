"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Ingredient = exports.IngredientCategory = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var recipe_entity_1 = require("./recipe.entity");
var IngredientCategory;
(function (IngredientCategory) {
    IngredientCategory["DAIRY"] = "dairy";
    IngredientCategory["FRUIT"] = "fruit";
    IngredientCategory["MEAT"] = "meat";
    IngredientCategory["NUT"] = "nut";
    IngredientCategory["VEGETABLE"] = "vegetable";
})(IngredientCategory = exports.IngredientCategory || (exports.IngredientCategory = {}));
graphql_1.registerEnumType(IngredientCategory, { name: "IngredientCategory" });
var Ingredient = /** @class */ (function () {
    function Ingredient() {
    }
    __decorate([
        graphql_1.Field(function (_type) { return graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn()
    ], Ingredient.prototype, "id");
    __decorate([
        graphql_1.Field(),
        class_validator_1.MaxLength(30),
        typeorm_1.Column()
    ], Ingredient.prototype, "name");
    __decorate([
        graphql_1.Field(function (_type) { return IngredientCategory; }),
        typeorm_1.Column({ type: "enum", "enum": IngredientCategory })
    ], Ingredient.prototype, "category");
    __decorate([
        typeorm_1.ManyToMany(function (_type) { return recipe_entity_1.Recipe; }, function (recipe) { return recipe.ingredients; })
    ], Ingredient.prototype, "recipes");
    Ingredient = __decorate([
        graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], Ingredient);
    return Ingredient;
}());
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.entity.js.map