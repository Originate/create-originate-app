import { ApolloProvider, NormalizedCacheObject } from "@apollo/client"
import React from "react"
import { ThemeProvider } from "styled-components"
import { useApollo } from "../lib/apolloClient"
import { theme } from "./Theme"
import { GlobalStyle } from "./GlobalStyles"

export default function App<
  Props extends { initialApolloState?: NormalizedCacheObject }
>({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<Props>
  pageProps: Props
}) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
