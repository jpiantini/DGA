import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { useSelector } from "react-redux";

const Router = ({ routes }) => {
  const { authenticated } = useSelector((state) => state.authReducer);
  return (
    <Switch >{routes.map((route) =>
    (
      route?.loginRequired == true && authenticated ? //IF LOGIN IS REQUIRED AND USER IS LOGGED IN CAN ACCESS TO ROUTE
        <Route key={route.path}  {...route} path={route.layout ? (route.layout + route.path) : route.path} />
        :
        route?.loginRequired == true && authenticated == false ? //IF LOGIN IS REQUIRED AND USER IS NOT LOGGED IN CAN`T ACCESS TO ROUTE
          <Redirect
            to='/public'
          />
          :
          <Route key={route.path}  {...route} path={route.layout ? (route.layout + route.path) : route.path} /> //PUBLIC ROUTES
    )
    )}
    </Switch>
  )
};

export default Router;