/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Landing from "./containers/Landing";
import Notes from "./containers/Notes";
import Info from "./containers/Info";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Privacy from "./containers/Privacy";
import NewNote from "./containers/NewNote";
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
    {/* <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} /> */}
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
