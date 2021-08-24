/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Landing from "./containers/Landing";
import Info from "./containers/Info";
import Login from "./components/Login";
import Privacy from "./containers/Privacy";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Info} props={childProps} />
    {/* <UnauthenticatedRoute path="/home" exact component={Landing} props={childProps} />  */}
    <UnauthenticatedRoute path="/privacy" exact component={Privacy} props={childProps} />
    <UnauthenticatedRoute path="/holidays" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
