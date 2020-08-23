import "./less/index.less"

import { Layout, NavbarMain } from "./components"

import { ApolloProvider } from "@apollo/client"
import { Button } from "antd"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { client } from "./apollo"
import { routes } from "./routes"

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Layout>
        <NavbarMain />
        {routes}
        <Button type="primary">Button</Button>
      </Layout>
    </Router>
  </ApolloProvider>
)

export default App
