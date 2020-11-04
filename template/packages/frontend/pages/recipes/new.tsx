import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useForm, useFormField } from "../../lib/useForm"

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

export default function NewRecipeForm() {
  const [addRecipe] = useMutation(addRecipeMutation, {
    update(cache, response) {
      if (response.data) {
        cache.evict({ id: "ROOT_QUERY", fieldName: "recipes" })
      }
    },
  })
  const router = useRouter()
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
      router.push("/recipes")
    },
    fields: [titleField, descriptionField],
  })
  return (
    <form {...formProps}>
      <h2>New Recipe</h2>
      <input {...titleField} />
      <input {...descriptionField} />
      <input type="submit" value="Create Recipe" />
    </form>
  )
}
