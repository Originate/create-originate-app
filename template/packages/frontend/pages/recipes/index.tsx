import { gql, useQuery, useMutation } from "@apollo/client"
import Link from "next/link"
import Title from "components/Title"
import { Button, RecipeContainer } from "./RecipeStyles"
import styled from "styled-components"

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

const deleteRecipesMutation = gql`
  mutation deleteRecipe($recipeId: ID!) {
    deleteRecipe(id: $recipeId)
  }
` as import("@graphql-typed-document-node/core").TypedDocumentNode<
  import("./__generated__/delete-recipe").deleteRecipe,
  import("./__generated__/delete-recipe").deleteRecipeVariables
>

const RecipeBox = styled.div`
  margin: 0.5rem;
  padding: 1rem;
  display: flex;
  border: 2px solid ${props => props.theme.colors.accent2};
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
`

function Recipe(recipe: {
  id: string
  title: string
  description: string | null
}) {
  const [deleteRecipe] = useMutation(deleteRecipesMutation, {
    variables: { recipeId: recipe.id },
    update(cache, response) {
      if (response.data) {
        cache.evict({ id: "ROOT_QUERY", fieldName: "recipes" })
      }
    },
  })
  return (
    <RecipeBox>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <Button primary onClick={() => deleteRecipe()}>
        delete
      </Button>
    </RecipeBox>
  )
}

export default function RecipesList() {
  const { loading, error, data } = useQuery(getRecipesQuery)
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <RecipeContainer>
      <h1>Recipes</h1>
      <Link href="/recipes/new">
        <Button>Add A Recipe</Button>
      </Link>
      {loading ? "Loading..." : null}
      {data
        ? data.recipes.map(recipe => <Recipe {...recipe} key={recipe.id} />)
        : null}
    </RecipeContainer>
  )
}
