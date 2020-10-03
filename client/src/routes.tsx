import {
  ChangePassword,
  CreateZone,
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
  Zone,
  Zones,
} from "./pages"
import { Route, Switch } from "react-router-dom"

import React from "react"

export const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:profile" component={Profile} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/change-password/:id" component={ChangePassword} />
    <Route exact path="/zones/all" component={Zones} />
    <Route exact path="/zone/:id/:token" component={Zone} />
    <Route exact path="/zone/create" component={CreateZone} />
    <Route exact path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
)
