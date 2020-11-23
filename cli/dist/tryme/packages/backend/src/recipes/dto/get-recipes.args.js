"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetRecipesArgs = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var GetRecipesArgs = /** @class */ (function () {
    function GetRecipesArgs() {
        this.skip = 0;
        this.take = 25;
    }
    __decorate([
        graphql_1.Field(function (_type) { return graphql_1.Int; }),
        class_validator_1.Min(0)
    ], GetRecipesArgs.prototype, "skip");
    __decorate([
        graphql_1.Field(function (_type) { return graphql_1.Int; }),
        class_validator_1.Min(1),
        class_validator_1.Max(50)
    ], GetRecipesArgs.prototype, "take");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], GetRecipesArgs.prototype, "title");
    __decorate([
        graphql_1.Field(function (_type) { return graphql_1.ID; }, { nullable: true })
    ], GetRecipesArgs.prototype, "userId");
    GetRecipesArgs = __decorate([
        graphql_1.ArgsType()
    ], GetRecipesArgs);
    return GetRecipesArgs;
}());
exports.GetRecipesArgs = GetRecipesArgs;
//# sourceMappingURL=get-recipes.args.js.map