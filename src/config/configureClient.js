import { ApolloClient } from "apollo-client";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";
import withRedux from "next-redux-wrapper";
import { compose } from "redux";
import { makeStore } from "../redux/store";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { SERVER } from "./config";

let authToken = null;

const isBrowser = () => typeof window !== "undefined";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: authToken || null,
    },
  });

  // Add onto payload for WebSocket authentication
  operation.authToken = authToken;

  return forward(operation);
});

/**
 * Set Token
 * @param token
 */
export const setToken = async (token) => {
  try {
    authToken = token ? `Bearer ${token}` : null;
    Cookies.set("token", authToken, { expires: 7 });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Set Token In Request
 * @param token
 */
export const setTokenInRequest = async (token) => {
  try {
    authToken = token ? token : null;
    return authToken;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Destroy Token
 * For logout purpose
 */
export const destroyToken = async () => {
  try {
    Cookies.remove("token");
    Cookies.defaults();
    authToken = null;
  } catch (error) {
    console.log(error);
  }
};

const httpLink = createHttpLink({
  uri: SERVER,
  fetch: !isBrowser() && fetch,
});

const createClient = (initialState) => {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient

  return new ApolloClient({
    connectToDevTools: isBrowser(),
    ssrMode: !isBrowser(), // Disables forceFetch on the server (so queries are only run once)
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    // cache: new InMemoryCache().restore(initialState || {}),
  });
};

export default compose(
  withApollo(({ initialState }) => createClient(initialState)),
  withRedux(makeStore)
);

export const client = new ApolloClient({
  connectToDevTools: isBrowser(),
  ssrMode: !isBrowser(), // Disables forceFetch on the server (so queries are only run once)
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
