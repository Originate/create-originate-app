import { gql, TypedDocumentNode } from "@apollo/client"
import * as addRecipeGen from "./__generated__/add-recipe"
import * as getRecipesGen from "./__generated__/get-recipes"

export const getRecipesQuery = gql`
  query getRecipes {
    recipes {
      id
      title
      description
      ingredients {
        id
        name
      }
    }
  }
` as TypedDocumentNode<
  getRecipesGen.getRecipes,
  getRecipesGen.getRecipesVariables
>

export const addRecipeMutation = gql`
  mutation addRecipe($recipe: NewRecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
` as TypedDocumentNode<addRecipeGen.addRecipe, addRecipeGen.addRecipeVariables>
