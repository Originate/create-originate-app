"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewRecipeInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var NewRecipeInput = /** @class */ (function () {
    function NewRecipeInput() {
    }
    __decorate([
        graphql_1.Field(),
        class_validator_1.MaxLength(30)
    ], NewRecipeInput.prototype, "title");
    __decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsOptional(),
        class_validator_1.MaxLength(255)
    ], NewRecipeInput.prototype, "description");
    __decorate([
        graphql_1.Field(function (_type) { return [graphql_1.ID]; }, { nullable: true })
    ], NewRecipeInput.prototype, "ingredientIDs");
    NewRecipeInput = __decorate([
        graphql_1.InputType()
    ], NewRecipeInput);
    return NewRecipeInput;
}());
exports.NewRecipeInput = NewRecipeInput;
//# sourceMappingURL=new-recipe.input.js.map