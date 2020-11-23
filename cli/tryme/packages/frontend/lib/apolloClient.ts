import { useMemo } from "react"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import env from "./env"

let apolloClient: ApolloClient<NormalizedCacheObject>
const isServerSide = typeof window === "undefined"

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServerSide,
    link: new HttpLink({
      uri: env.graphqlUrl,
    }),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the
  // initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client-side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // On the client create the Apollo Client once and save a reference to it. For
  // SSR and SSG we want a new Client instance every time this function is
  // called.
  if (!isServerSide && !apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
