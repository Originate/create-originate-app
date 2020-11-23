import { ApolloProvider, NormalizedCacheObject } from "@apollo/client"
import React from "react"
import { ThemeProvider } from "styled-components"
import { useApollo } from "../lib/apolloClient"
import { theme } from "../components/Theme"
import { GlobalStyle } from "../components/GlobalStyles"

/**
 * The App component implicitly wraps every page component. This code runs
 * client-side and server-side.
 *
 * See https://nextjs.org/docs/advanced-features/custom-app
 */
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
