import {
  ForgotPassword,
  Home,
  Login,
  Register,
  Zone,
  ZoneCreate,
  Zones,
} from "./pages"
import { Route, Switch } from "react-router-dom"

import React from "react"

export const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/zones" component={Zones} />
    <Route exact path="/zone/:host/:id" component={Zone} />
    <Route exact path="/zone/create" component={ZoneCreate} />
    <Route exact path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
)
