import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useForm, useFormField } from "../../lib/useForm"
import { RecipeContainer, Button } from "./RecipeStyles"
import styled from "styled-components"

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

const Form = styled.form`
  width: 100%;
  margin: 8px 0;
`

const Input = styled.input`
  font-size: 1em;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
`
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
    <RecipeContainer>
      <h1>New Recipe</h1>
      <Form {...formProps}>
        <Input {...titleField} />
        <Input {...descriptionField} />
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    </RecipeContainer>
  )
}
