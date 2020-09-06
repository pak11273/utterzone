import "./less/index.less"

import { Announcement, Layout, MenuMain, NavbarMain } from "./components"

import { ApolloProvider } from "@apollo/client"
import { Cache } from "react-avatar"
import { ConfigProvider } from "react-avatar"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { client } from "./apollo"
import dotenv from "dotenv"
import { routes } from "./routes"

dotenv.config()

const cache = new Cache({
  // Keep cached source failures for up to 7 days
  sourceTTL: 7 * 24 * 3600 * 1000,

  // Keep a maximum of 20 entries in the source cache
  sourceSize: 10,
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider cache={cache}>
        <Router>
          <Layout>
            <Announcement />
            <NavbarMain />
            <div style={{ display: "flex", height: "100vh" }}>
              <MenuMain />
              <div style={{ width: "100%", minHeight: "100%" }}>{routes}</div>
            </div>
          </Layout>
        </Router>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default App
