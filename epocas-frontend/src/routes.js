import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import SignIn from "./pages/SignIn";
import { Home } from "./pages/Home";
import { Occasion } from "./pages/Occasion";
import { CreateOccasion } from "./pages/CreateOccasion";
import { EditOccasion } from "./pages/EditOccasion";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <PrivateRoute path="/app" component={Home} />
      <PrivateRoute path="/occasion/create" component={CreateOccasion} />
      <PrivateRoute exact path="/occasion/:id" component={Occasion} />
      <PrivateRoute exact path="/occasion/:id/edit" component={EditOccasion} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
