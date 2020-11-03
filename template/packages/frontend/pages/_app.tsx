import { ApolloProvider, NormalizedCacheObject } from "@apollo/client"
import React from "react"
import { useApollo } from "../lib/apolloClient"

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
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
