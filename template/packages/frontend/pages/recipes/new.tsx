import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useForm, useFormField } from "../../lib/useForm"
import {
  RecipeContainer,
  Button,
  BackButton,
} from "../../components/RecipeStyles"
import styled from "styled-components"
import Link from "next/link"

const addRecipeMutation = gql`
  mutation AddRecipe($recipe: NewRecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
    }
  }
` as import("./__generated__/add-recipe").AddRecipeDocument

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
      <Link href="/recipes">
        <BackButton>Back</BackButton>
      </Link>
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
