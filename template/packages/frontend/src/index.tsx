import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import * as React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App"
import { Error } from "./components/error"
import { parseEnv } from "./env"

const main = () => {
  const root = document.getElementById("root")
  const env = parseEnv()
  if (typeof env == "string") {
    ReactDOM.render(
      <Error
        header="unable to parse webpack env"
        message={env}
        footer="unsolicited advice: check your packages/frontend/.env file"
      />,
      root,
    )
    return
  }

  const client = new ApolloClient({
    uri: env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
  })
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root,
  )
}

main()
