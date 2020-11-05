import { gql, useQuery } from "@apollo/client"
import Link from "next/link"

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

function Recipe(recipe: { title: string; description: string | null }) {
  return (
    <div style={{ border: "2px solid black", marginTop: "2em" }}>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <button>delete</button>
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
      <h1>Recipes</h1>
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
