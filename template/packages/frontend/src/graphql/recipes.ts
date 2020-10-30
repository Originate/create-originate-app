import { gql } from "@apollo/client"

const recipeFields = gql`
  fragment RecipeFields on Recipe {
    id
    title
    description
  }
`

export const getRecipesQuery = gql`
  query getRecipes {
    recipes {
      id
      ...RecipeFields
      ingredients {
        id
        name
      }
    }
  }
  ${recipeFields}
` as import("@graphql-typed-document-node/core").TypedDocumentNode<
  import("./__generated__/get-recipes").getRecipes,
  import("./__generated__/get-recipes").getRecipesVariables
>

export const addRecipeMutation = gql`
  mutation addRecipe($recipe: NewRecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      ...RecipeFields
    }
  }
  ${recipeFields}
` as import("@graphql-typed-document-node/core").TypedDocumentNode<
  import("./__generated__/add-recipe").addRecipe,
  import("./__generated__/add-recipe").addRecipeVariables
>
