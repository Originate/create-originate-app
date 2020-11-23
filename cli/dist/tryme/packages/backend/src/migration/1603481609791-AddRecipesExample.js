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
exports.AddRecipes1603481609791 = void 0;
var AddRecipes1603481609791 = /** @class */ (function () {
    function AddRecipes1603481609791() {
        this.name = 'AddRecipes1603481609791';
    }
    AddRecipes1603481609791.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"recipe\" (\"id\" SERIAL NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"title\" character varying NOT NULL, \"description\" text, CONSTRAINT \"PK_e365a2fedf57238d970e07825ca\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"ingredient_category_enum\" AS ENUM('dairy', 'fruit', 'meat', 'nut', 'vegetable')")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"ingredient\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"category\" \"ingredient_category_enum\" NOT NULL, CONSTRAINT \"PK_6f1e945604a0b59f56a57570e98\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"recipe_ingredients_ingredient\" (\"recipeId\" integer NOT NULL, \"ingredientId\" integer NOT NULL, CONSTRAINT \"PK_6e193bb10a2cd8a65929edf7d07\" PRIMARY KEY (\"recipeId\", \"ingredientId\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_b67e81a9afa83f2ee13440175c\" ON \"recipe_ingredients_ingredient\" (\"recipeId\") ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_d2bbcf7bab477bfdcec65465c0\" ON \"recipe_ingredients_ingredient\" (\"ingredientId\") ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"recipe_ingredients_ingredient\" ADD CONSTRAINT \"FK_b67e81a9afa83f2ee13440175ce\" FOREIGN KEY (\"recipeId\") REFERENCES \"recipe\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"recipe_ingredients_ingredient\" ADD CONSTRAINT \"FK_d2bbcf7bab477bfdcec65465c0c\" FOREIGN KEY (\"ingredientId\") REFERENCES \"ingredient\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddRecipes1603481609791.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"recipe_ingredients_ingredient\" DROP CONSTRAINT \"FK_d2bbcf7bab477bfdcec65465c0c\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"recipe_ingredients_ingredient\" DROP CONSTRAINT \"FK_b67e81a9afa83f2ee13440175ce\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_d2bbcf7bab477bfdcec65465c0\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_b67e81a9afa83f2ee13440175c\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"recipe_ingredients_ingredient\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"ingredient\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"ingredient_category_enum\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"recipe\"")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AddRecipes1603481609791;
}());
exports.AddRecipes1603481609791 = AddRecipes1603481609791;
//# sourceMappingURL=1603481609791-AddRecipesExample.js.map