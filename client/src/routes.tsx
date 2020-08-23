import { Home, Login, Register } from "./pages"
import { Route, Switch } from "react-router-dom"

import React from "react"

export const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
)
