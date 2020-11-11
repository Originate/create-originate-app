import { ApolloProvider, NormalizedCacheObject } from "@apollo/client"
import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { useApollo } from "../lib/apolloClient"

const theme = {
  colors: {
    link: "#0070f3",
    background: "#fafafa",
    accent: "#dbdada",
  },
}

const GlobalStyle = createGlobalStyle`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        a {
          color: inherit;
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
  
`

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
