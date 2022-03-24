import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound"
import Login from "./containers/Login"
import Search from "./containers/Search"
import Detail from "./containers/Detail"
import AppliedRoute from "./components/AppliedRoute"

export default ({ childProps}, {userHasAuthenticated}) =>
  <Switch>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/search" exact component={Search} props={childProps}/>
    <AppliedRoute path="/detail" exact component={Detail} props={childProps}/>
    <Route component={NotFound} /> //catch 404
  </Switch>;