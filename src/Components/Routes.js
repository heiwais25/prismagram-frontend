import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
    <Redirect path="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect path="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
