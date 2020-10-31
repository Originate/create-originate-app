import { gql, useMutation, useQuery } from "@apollo/client"
import * as React from "react"
import { useForm, useFormField } from "../../hooks/useForm"

const addRecipeMutation = gql`
  mutation addRecipe($recipe: NewRecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
    }
  }
` as import("@graphql-typed-document-node/core").TypedDocumentNode<
  import("./__generated__/add-recipe").addRecipe,
  import("./__generated__/add-recipe").addRecipeVariables
>

const NewRecipeForm = () => {
  const [addRecipe] = useMutation(addRecipeMutation)
  const titleField = useFormField("")
  const descriptionField = useFormField("")
  const formProps = useForm({
    handleSubmit: async () => {
      await addRecipe({
        variables: {
          recipe: {
            title: titleField.value,
            description: descriptionField.value,
            ingredientIDs: [],
          },
        },
      })
    },
    fields: [titleField, descriptionField],
  })
  return (
    <form {...formProps}>
      <h2>New Recipe</h2>
      <input {...titleField} />
      <input {...descriptionField} />
    </form>
  )
}

const Recipe = (recipe: { title: string; description: string | null }) => {
  return (
    <div style={{ border: "2px solid black", marginTop: "2em" }}>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </div>
  )
}

const getRecipesQuery = gql`
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
` as import("@graphql-typed-document-node/core").TypedDocumentNode<
  import("./__generated__/get-recipes").getRecipes,
  import("./__generated__/get-recipes").getRecipesVariables
>

const RecipesList = () => {
  const { loading, error, data } = useQuery(getRecipesQuery)
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      {loading ? "Loading..." : null}
      {data ? data.recipes.map(Recipe) : null}
    </div>
  )
}

export const Recipes = () => {
  return (
    <div>
      <NewRecipeForm />
      <hr />
      <RecipesList />
    </div>
  )
}
