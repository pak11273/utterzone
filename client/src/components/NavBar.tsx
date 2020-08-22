import { useLogoutMutation, useMeQuery } from "../generated/graphql"

import React from "react"
import { isServer } from "../utils/isServer"

// import { useApolloClient  } from "@apollo/client"

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation()
  // const apolloClient = useApolloClient()
  const { data, loading } = useMeQuery({
    skip: isServer(),
  })

  let body = null

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <link href="/login">
          <link>login</link>
        </link>
        <link href="/register">
          <link>register</link>
        </link>
      </>
    )
    // user is logged in
  } else {
    body = (
      <div>
        <link href="/create-post">
          <button>create post</button>
        </link>
        <div>{data.me.username}</div>
        <button
          onClick={async () => {
            await logout()
            // await apolloClient.resetStore()
          }}
        >
          logout
        </button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <link href="/">
          <link>
            <div>Utterzone</div>
          </link>
        </link>
        <div>{body}</div>
      </div>
    </div>
  )
}
