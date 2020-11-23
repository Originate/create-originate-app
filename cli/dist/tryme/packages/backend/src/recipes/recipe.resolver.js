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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RecipeResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var apollo_server_express_1 = require("apollo-server-express");
var ingredient_entity_1 = require("./models/ingredient.entity");
var recipe_entity_1 = require("./models/recipe.entity");
var RecipeResolver = /** @class */ (function () {
    function RecipeResolver(recipeService) {
        this.recipeService = recipeService;
    }
    RecipeResolver.prototype.recipe = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.recipeService.findById(id)];
                    case 1:
                        recipe = _a.sent();
                        if (!recipe) {
                            throw new Error("recipe not found, " + id);
                        }
                        return [2 /*return*/, recipe];
                }
            });
        });
    };
    RecipeResolver.prototype.recipes = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recipeService.find(args)];
            });
        });
    };
    RecipeResolver.prototype.addRecipe = function (recipe) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recipeService.create(recipe)];
            });
        });
    };
    RecipeResolver.prototype.deleteRecipe = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.recipeService["delete"](id)];
                    case 1:
                        success = _a.sent();
                        if (!success) {
                            throw new apollo_server_express_1.UserInputError("Could not find recipe with ID " + id, {
                                id: id
                            });
                        }
                        return [2 /*return*/, success];
                }
            });
        });
    };
    // GraphQL can retrieve values from simple entity properties that have
    // `@Field` annotations. But some properties require logic; in those cases we
    // use a `@ResolveField` resolver method. Here the `user` and
    // `ingredients` fields require follow-up database queries.
    //
    // We want to batch those queries to avoid the N+1 query problem, so we use
    // a data loader.
    RecipeResolver.prototype.ingredients = function (recipe) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recipeService.ingredientsLoader.load(recipe.id)];
            });
        });
    };
    __decorate([
        graphql_1.Query(function (_returns) { return recipe_entity_1.Recipe; }, {
            description: "Get a recipe by its ID"
        }),
        __param(0, graphql_1.Args("id", { type: function () { return graphql_1.ID; } }))
    ], RecipeResolver.prototype, "recipe");
    __decorate([
        graphql_1.Query(function (_returns) { return [recipe_entity_1.Recipe]; }, {
            description: "Get recipes written by you, or that are publicly shared"
        }),
        __param(0, graphql_1.Args())
    ], RecipeResolver.prototype, "recipes");
    __decorate([
        graphql_1.Mutation(function (_returns) { return recipe_entity_1.Recipe; }),
        __param(0, graphql_1.Args("recipe"))
    ], RecipeResolver.prototype, "addRecipe");
    __decorate([
        graphql_1.Mutation(function (_returns) { return Boolean; }),
        __param(0, graphql_1.Args("id", { type: function () { return graphql_1.ID; } }))
    ], RecipeResolver.prototype, "deleteRecipe");
    __decorate([
        graphql_1.ResolveField(function (_returns) { return [ingredient_entity_1.Ingredient]; }),
        __param(0, graphql_1.Root())
    ], RecipeResolver.prototype, "ingredients");
    RecipeResolver = __decorate([
        graphql_1.Resolver(function () { return recipe_entity_1.Recipe; })
    ], RecipeResolver);
    return RecipeResolver;
}());
exports.RecipeResolver = RecipeResolver;
//# sourceMappingURL=recipe.resolver.js.map