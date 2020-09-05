import { ApolloClient } from "@apollo/client/core/ApolloClient"
import { HttpLink } from "@apollo/client/link/http/HttpLink"
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { split } from "@apollo/client/link/core/split"

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  },
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }: { query: any }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link: splitLink,
  // uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
})
