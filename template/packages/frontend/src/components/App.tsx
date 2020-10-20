import { useQuery } from "@apollo/client"
import * as React from "react"
import { getRecipes } from "../graphql/getRecipes"

export const App = () => {
  const { loading, error, data } = useQuery(getRecipes)
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return <div>{loading ? "Loading..." : data}</div>
}
