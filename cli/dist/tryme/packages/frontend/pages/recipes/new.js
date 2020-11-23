"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@apollo/client");
var router_1 = require("next/router");
var useForm_1 = require("../../lib/useForm");
var RecipeStyles_1 = require("../../components/RecipeStyles");
var styled_components_1 = __importDefault(require("styled-components"));
var link_1 = __importDefault(require("next/link"));
var addRecipeMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation addRecipe($recipe: NewRecipeInput!) {\n    addRecipe(recipe: $recipe) {\n      id\n    }\n  }\n"], ["\n  mutation addRecipe($recipe: NewRecipeInput!) {\n    addRecipe(recipe: $recipe) {\n      id\n    }\n  }\n"])));
var Form = styled_components_1["default"].form(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  margin: 8px 0;\n"], ["\n  width: 100%;\n  margin: 8px 0;\n"])));
var Input = styled_components_1["default"].input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 1em;\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n"], ["\n  font-size: 1em;\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n"])));
function NewRecipeForm() {
    var _this = this;
    var _a = __read(client_1.useMutation(addRecipeMutation, {
        update: function (cache, response) {
            if (response.data) {
                cache.evict({ id: "ROOT_QUERY", fieldName: "recipes" });
            }
        }
    }), 1), addRecipe = _a[0];
    var router = router_1.useRouter();
    var titleField = useForm_1.useFormField("");
    var descriptionField = useForm_1.useFormField("");
    var formProps = useForm_1.useForm({
        handleSubmit: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addRecipe({
                            variables: {
                                recipe: {
                                    title: titleField.value,
                                    description: descriptionField.value,
                                    ingredientIDs: []
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        router.push("/recipes");
                        return [2 /*return*/];
                }
            });
        }); },
        fields: [titleField, descriptionField]
    });
    return (<RecipeStyles_1.RecipeContainer>
      <link_1["default"] href="/recipes">
        <RecipeStyles_1.BackButton>Back</RecipeStyles_1.BackButton>
      </link_1["default"]>
      <h1>New Recipe</h1>
      <Form {...formProps}>
        <Input {...titleField}/>
        <Input {...descriptionField}/>
        <RecipeStyles_1.Button primary type="submit">
          Submit
        </RecipeStyles_1.Button>
      </Form>
    </RecipeStyles_1.RecipeContainer>);
}
exports["default"] = NewRecipeForm;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=new.js.map