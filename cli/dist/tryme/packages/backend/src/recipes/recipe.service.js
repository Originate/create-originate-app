"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.RecipeService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var dataloader_1 = __importDefault(require("dataloader"));
var lodash_1 = require("lodash");
var typeorm_2 = require("typeorm");
var ingredient_entity_1 = require("./models/ingredient.entity");
var recipe_entity_1 = require("./models/recipe.entity");
// This service includes data loaders - it's important to create a new instance
// of each data loader for each API request. Therefore we need to set the
// injectable scope for this service to `Scope.REQUEST`.
var RecipeService = /** @class */ (function () {
    function RecipeService(manager, recipeRepository) {
        var _this = this;
        this.manager = manager;
        this.recipeRepository = recipeRepository;
        // A data loader batches multiple lookups that may occur during one GraphQL
        // request. The batch function accepts an array of lookup keys, and must
        // resolve with an array of results or errors in the same order.
        this.ingredientsLoader = new dataloader_1["default"](function (recipeIds) { return __awaiter(_this, void 0, void 0, function () {
            var ingredients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager
                            .createQueryBuilder(ingredient_entity_1.Ingredient, "ingredient")
                            .innerJoin("ingredient.recipes", "recipe")
                            .where("recipe.id IN (:...recipeIds)", { recipeIds: recipeIds })
                            .getMany()];
                    case 1:
                        ingredients = _a.sent();
                        return [2 /*return*/, recipeIds.map(function (id) { return lodash_1.filter(ingredients, { id: id }); })];
                }
            });
        }); }, { maxBatchSize: 1000 });
    }
    RecipeService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.manager.findOne(recipe_entity_1.Recipe, id)];
            });
        });
    };
    RecipeService.prototype.find = function (_a) {
        var title = _a.title, userId = _a.userId, skip = _a.skip, take = _a.take;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.manager.find(recipe_entity_1.Recipe, {
                        where: __assign(__assign({}, (userId ? { userId: userId } : null)), (title ? { title: typeorm_2.Like(title) } : null)),
                        skip: skip,
                        take: take,
                        order: { title: "ASC", createdAt: "DESC" }
                    })];
            });
        });
    };
    RecipeService.prototype.findByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.manager.find(recipe_entity_1.Recipe, {
                        where: { userId: userId },
                        order: { title: "ASC", createdAt: "DESC" }
                    })];
            });
        });
    };
    RecipeService.prototype.create = function (recipe) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, ingredients, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        manager = this.manager;
                        if (!recipe.ingredientIDs) return [3 /*break*/, 2];
                        return [4 /*yield*/, manager.findByIds(ingredient_entity_1.Ingredient, recipe.ingredientIDs)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = [];
                        _b.label = 3;
                    case 3:
                        ingredients = _a;
                        return [2 /*return*/, this.recipeRepository.save(__assign(__assign({}, recipe), { ingredients: ingredients }))];
                }
            });
        });
    };
    /*
     * Deletes a recipe, returns `true` on success or `false` if the recipe row
     * was not found.
     */
    RecipeService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.recipeRepository["delete"](id)];
                    case 1:
                        deleteResult = _a.sent();
                        return [2 /*return*/, deleteResult.affected === 1];
                }
            });
        });
    };
    RecipeService = __decorate([
        common_1.Injectable({ scope: common_1.Scope.REQUEST }),
        __param(0, typeorm_1.InjectEntityManager()),
        __param(1, typeorm_1.InjectRepository(recipe_entity_1.Recipe))
    ], RecipeService);
    return RecipeService;
}());
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map