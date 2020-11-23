"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.IngredientService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var ingredient_entity_1 = require("../models/ingredient.entity");
var IngredientService = /** @class */ (function () {
    function IngredientService(repository) {
        this.repository = repository;
    }
    IngredientService.prototype.create = function (ingredient) {
        return this.repository.save(ingredient);
    };
    IngredientService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(ingredient_entity_1.Ingredient))
    ], IngredientService);
    return IngredientService;
}());
exports.IngredientService = IngredientService;
//# sourceMappingURL=ingredient.service.js.map