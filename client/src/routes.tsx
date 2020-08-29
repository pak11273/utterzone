import {
  ForgotPassword,
  Home,
  Login,
  PageZone,
  PageZoneCreate,
  Register,
} from "./pages"
import { Route, Switch } from "react-router-dom"

import React from "react"

export const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/zone" component={PageZone} />
    <Route exact path="/zone/create" component={PageZoneCreate} />
    <Route exact path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
)
