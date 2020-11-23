"use strict";
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
var testing_1 = require("@nestjs/testing");
var typeorm_1 = require("@nestjs/typeorm");
var recipe_entity_1 = require("./models/recipe.entity");
var recipe_service_1 = require("./recipe.service");
describe("RecipeService", function () {
    var service;
    var entityManager = {
        find: jest.fn()
    };
    var repository = {};
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            recipe_service_1.RecipeService,
                            {
                                provide: typeorm_1.getEntityManagerToken(),
                                useValue: entityManager
                            },
                            {
                                provide: typeorm_1.getRepositoryToken(recipe_entity_1.Recipe),
                                useValue: repository
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    return [4 /*yield*/, module.resolve(recipe_service_1.RecipeService)];
                case 2:
                    service = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("looks up a list of recipes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var recipes, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    recipes = [
                        {
                            id: 1,
                            title: "Yummy Cookies",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                    ];
                    entityManager.find.mockImplementation(function (entityType, params) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            expect(entityType).toBe(recipe_entity_1.Recipe);
                            expect(params).toMatchObject({ skip: 0, take: 25 });
                            return [2 /*return*/, recipes];
                        });
                    }); });
                    _a = expect;
                    return [4 /*yield*/, service.find({ skip: 0, take: 25 })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual(recipes);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=recipe.service.spec.js.map