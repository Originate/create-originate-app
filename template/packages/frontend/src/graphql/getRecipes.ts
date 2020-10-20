import { gql } from "@apollo/client"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import * as gen from "./__generated__/get-recipes"

export const getRecipes = gql`
  query getRecipes {
    recipes {
      id
      title
      ingredients {
        id
        name
      }
      user {
        id
        email
      }
    }
  }
` as TypedDocumentNode<gen.getRecipes, gen.getRecipesVariables>
