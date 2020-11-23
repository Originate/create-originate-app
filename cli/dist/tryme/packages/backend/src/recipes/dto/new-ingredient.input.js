"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewIngredientInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var ingredient_entity_1 = require("../models/ingredient.entity");
var NewIngredientInput = /** @class */ (function () {
    function NewIngredientInput() {
    }
    __decorate([
        graphql_1.Field(),
        class_validator_1.MaxLength(30)
    ], NewIngredientInput.prototype, "name");
    __decorate([
        graphql_1.Field(function (_type) { return ingredient_entity_1.IngredientCategory; })
    ], NewIngredientInput.prototype, "category");
    NewIngredientInput = __decorate([
        graphql_1.InputType()
    ], NewIngredientInput);
    return NewIngredientInput;
}());
exports.NewIngredientInput = NewIngredientInput;
//# sourceMappingURL=new-ingredient.input.js.map