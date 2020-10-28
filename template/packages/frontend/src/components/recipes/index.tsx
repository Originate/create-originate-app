import { useMutation, useQuery, TypedDocumentNode } from "@apollo/client"
import * as React from "react"
import { addRecipeMutation, getRecipesQuery } from "../../graphql/recipes"
import { useForm, useFormField } from "../../hooks/useForm"

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
            isPublic: true,
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

type ResultOf<T> = T extends TypedDocumentNode<infer R, unknown> ? R : never

const Recipe = (
  recipe: ResultOf<typeof getRecipesQuery>["recipes"][number],
) => {
  return (
    <div style={{ border: "2px solid black", marginTop: "2em" }}>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </div>
  )
}

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
