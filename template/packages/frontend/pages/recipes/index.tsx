import { gql, useQuery, useMutation } from "@apollo/client"
import Link from "next/link"
import Title from "components/Title"

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
    <div style={{ border: "2px solid black", marginTop: "2em" }}>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <button onClick={() => deleteRecipe()}>delete</button>
    </div>
  )
}

export default function RecipesList() {
  const { loading, error, data } = useQuery(getRecipesQuery)
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <Title text={"Recipes"} />
      {loading ? "Loading..." : null}
      {data
        ? data.recipes.map(recipe => <Recipe {...recipe} key={recipe.id} />)
        : null}
      <Link href="/recipes/new">
        <a>Add a recipe</a>
      </Link>
    </div>
  )
}
