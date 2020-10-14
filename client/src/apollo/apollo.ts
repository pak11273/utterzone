import { ApolloClient } from "@apollo/client/core/ApolloClient"
import { HttpLink } from "@apollo/client/link/http/HttpLink"
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache"
import { WebSocketLink } from "@apollo/client/link/ws"
import { apolloPolicies } from "./apolloPolicies"
import  dotenv  from 'dotenv'
import { getMainDefinition } from "@apollo/client/utilities"
import { split } from "@apollo/client/link/core/split"

dotenv.config()

// import { loader } from "graphql.macro"


// const typeDefs = loader("../graphql/clientSchema.graphql")

export const cache = new InMemoryCache({
  typePolicies: apolloPolicies,
})

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV==="development" ? "http://localhost:4000/graphql" : "http://192.168.99.100:4000/graphql",
  credentials: "include",
})

const wsLink = new WebSocketLink({
  uri: process.env.NODE_ENV==="development" ? "ws://localhost:4000/graphql" : "ws://192.168.99.100:4000/graphql",
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
  // uri: "http://localhost:4000/graphql",
  cache,
  // credentials: "include",
  // typeDefs,
})
