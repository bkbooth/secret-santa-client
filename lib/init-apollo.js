import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
const {
  publicRuntimeConfig: { apiEndpoint }
} = getConfig();

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, req) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: apiEndpoint,
      credentials: "include",
      headers: !process.browser && req ? { cookie: req.headers.cookie } : {}
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, req) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
