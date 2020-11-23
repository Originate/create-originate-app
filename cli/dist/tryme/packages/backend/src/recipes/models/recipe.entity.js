"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Recipe = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var ingredient_entity_1 = require("./ingredient.entity");
var Recipe = /** @class */ (function () {
    function Recipe() {
    }
    __decorate([
        graphql_1.Field(function (_type) { return graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn()
    ], Recipe.prototype, "id");
    __decorate([
        graphql_1.Field(),
        typeorm_1.CreateDateColumn()
    ], Recipe.prototype, "createdAt");
    __decorate([
        graphql_1.Field(),
        typeorm_1.UpdateDateColumn()
    ], Recipe.prototype, "updatedAt");
    __decorate([
        graphql_1.Field(),
        typeorm_1.Column()
    ], Recipe.prototype, "title");
    __decorate([
        graphql_1.Field({ nullable: true }),
        typeorm_1.Column({ nullable: true, type: "text" })
    ], Recipe.prototype, "description");
    __decorate([
        typeorm_1.ManyToMany(function (_type) { return ingredient_entity_1.Ingredient; }, function (ingredient) { return ingredient.recipes; }),
        typeorm_1.JoinTable()
    ], Recipe.prototype, "ingredients");
    Recipe = __decorate([
        graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], Recipe);
    return Recipe;
}());
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.entity.js.map