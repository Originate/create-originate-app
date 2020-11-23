"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var link_1 = __importDefault(require("next/link"));
var RecipeStyles_1 = require("../../components/RecipeStyles");
var styled_components_1 = __importDefault(require("styled-components"));
var getRecipesQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query getRecipes {\n    recipes {\n      id\n      title\n      description\n      ingredients {\n        id\n        name\n      }\n    }\n  }\n"], ["\n  query getRecipes {\n    recipes {\n      id\n      title\n      description\n      ingredients {\n        id\n        name\n      }\n    }\n  }\n"])));
var deleteRecipesMutation = client_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation deleteRecipe($recipeId: ID!) {\n    deleteRecipe(id: $recipeId)\n  }\n"], ["\n  mutation deleteRecipe($recipeId: ID!) {\n    deleteRecipe(id: $recipeId)\n  }\n"])));
var RecipeBox = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0.5rem;\n  padding: 1rem;\n  display: flex;\n  border: 2px solid ", ";\n  border-radius: 10px;\n  align-items: center;\n  flex-direction: column;\n"], ["\n  margin: 0.5rem;\n  padding: 1rem;\n  display: flex;\n  border: 2px solid ", ";\n  border-radius: 10px;\n  align-items: center;\n  flex-direction: column;\n"])), function (props) { return props.theme.colors.accent2; });
function Recipe(recipe) {
    var _a = __read(client_1.useMutation(deleteRecipesMutation, {
        variables: { recipeId: recipe.id },
        update: function (cache, response) {
            if (response.data) {
                cache.evict({ id: "ROOT_QUERY", fieldName: "recipes" });
            }
        }
    }), 1), deleteRecipe = _a[0];
    return (<RecipeBox>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <RecipeStyles_1.Button primary onClick={function () { return deleteRecipe(); }}>
        delete
      </RecipeStyles_1.Button>
    </RecipeBox>);
}
function RecipesList() {
    var _a = client_1.useQuery(getRecipesQuery), loading = _a.loading, error = _a.error, data = _a.data;
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (<RecipeStyles_1.RecipeContainer>
      <link_1["default"] href="/">
        <RecipeStyles_1.BackButton>Back</RecipeStyles_1.BackButton>
      </link_1["default"]>
      <h1>Recipes</h1>
      <link_1["default"] href="/recipes/new">
        <RecipeStyles_1.Button>Add A Recipe</RecipeStyles_1.Button>
      </link_1["default"]>
      {loading ? "Loading..." : null}
      {data
        ? data.recipes.map(function (recipe) { return <Recipe {...recipe} key={recipe.id}/>; })
        : null}
    </RecipeStyles_1.RecipeContainer>);
}
exports["default"] = RecipesList;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map