"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var testing_1 = require("@nestjs/testing");
var docker_await_postgres_1 = require("@originate/docker-await-postgres");
var supertest_1 = __importDefault(require("supertest"));
var typeorm_1 = require("typeorm");
jest.setTimeout(15000);
describe("Recipes example (e2e)", function () {
    var app;
    var stopDatabase;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var stop, AppModule, moduleFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTestDatabase()];
                case 1:
                    stop = (_a.sent()).stop;
                    stopDatabase = stop;
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../src/app.module")); })];
                case 2:
                    AppModule = (_a.sent()).AppModule;
                    return [4 /*yield*/, testing_1.Test.createTestingModule({
                            imports: [AppModule]
                        }).compile()];
                case 3:
                    moduleFixture = _a.sent();
                    app = moduleFixture.createNestApplication();
                    return [4 /*yield*/, app.init()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stopDatabase) return [3 /*break*/, 2];
                    return [4 /*yield*/, stopDatabase()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    it("creates a recipe", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, graphqlRequest(app, {
                            query: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation addRecipe($recipe: NewRecipeInput!) {\n            addRecipe(recipe: $recipe) {\n              id\n            }\n          }\n        "], ["\n          mutation addRecipe($recipe: NewRecipeInput!) {\n            addRecipe(recipe: $recipe) {\n              id\n            }\n          }\n        "]))),
                            variables: {
                                recipe: {
                                    description: "my description",
                                    ingredientIDs: [],
                                    title: "my title"
                                }
                            }
                        })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual({
                        data: { addRecipe: { id: expect.any(String) } }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("gets a list of recipes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, graphqlRequest(app, {
                            query: gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          query {\n            recipes {\n              id\n              title\n              description\n            }\n          }\n        "], ["\n          query {\n            recipes {\n              id\n              title\n              description\n            }\n          }\n        "])))
                        })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual({
                        data: {
                            recipes: [
                                {
                                    id: expect.any(String),
                                    title: "my title",
                                    description: "my description"
                                },
                            ]
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("deletes a recipe", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, graphqlRequest(app, {
                            query: gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          mutation {\n            deleteRecipe(id: 1)\n          }\n        "], ["\n          mutation {\n            deleteRecipe(id: 1)\n          }\n        "])))
                        })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual({
                        data: { deleteRecipe: true }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("reports failure when deleting a recipe that does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = "99";
                    _a = expect;
                    return [4 /*yield*/, graphqlRequest(app, {
                            query: gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          mutation deleteRecipe($id: ID!) {\n            deleteRecipe(id: $id)\n          }\n        "], ["\n          mutation deleteRecipe($id: ID!) {\n            deleteRecipe(id: $id)\n          }\n        "]))),
                            variables: { id: id }
                        })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual({
                        data: null,
                        errors: [
                            expect.objectContaining({
                                extensions: expect.objectContaining({
                                    code: "BAD_USER_INPUT",
                                    id: id
                                }),
                                message: "Could not find recipe with ID " + id
                            }),
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("creates an ingredient", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, graphqlRequest(app, {
                            query: gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n          mutation addIngredient($ingredient: NewIngredientInput!) {\n            addIngredient(ingredient: $ingredient) {\n              id\n            }\n          }\n        "], ["\n          mutation addIngredient($ingredient: NewIngredientInput!) {\n            addIngredient(ingredient: $ingredient) {\n              id\n            }\n          }\n        "]))),
                            variables: {
                                ingredient: {
                                    category: "FRUIT",
                                    name: "my name"
                                }
                            }
                        })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual({
                        data: { addIngredient: { id: expect.any(String) } }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
// TODO: move to @originate/scripts
function graphqlRequest(app, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](app.getHttpServer())
                        .post("/graphql")
                        .send(payload)
                        .expect(function (res) { return res.ok || console.error(res.body); })
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, JSON.parse(response.text)];
            }
        });
    });
}
// TODO: move to @originate/scripts
function gql(query) {
    return query.join("\n");
}
// TODO: move to @originate/scripts
function getTestDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, port, stop, conn;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        user: "postgres",
                        password: "password",
                        database: "postgres",
                        image: "postgres:latest",
                        ensureShutdown: true
                    };
                    return [4 /*yield*/, docker_await_postgres_1.startPostgresContainer(config)];
                case 1:
                    _a = _b.sent(), port = _a.port, stop = _a.stop;
                    process.env.DATABASE_URL = "postgres://" + config.user + ":" + config.password + "@localhost:" + port + "/" + config.database;
                    return [4 /*yield*/, typeorm_1.createConnection()];
                case 2:
                    conn = _b.sent();
                    return [4 /*yield*/, conn.runMigrations()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, conn.close()];
                case 4:
                    _b.sent();
                    return [2 /*return*/, { stop: stop }];
            }
        });
    });
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=recipes.e2e-spec.js.map