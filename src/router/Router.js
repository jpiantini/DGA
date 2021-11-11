import React from 'react';
import { Switch,Route } from 'react-router';

const Router = ({ routes }) => {
  return <Switch >{routes.map((route) => <Route key={route.path}  {...route} path={route.layout ? (route.layout + route.path) : route.path} />)}</Switch>;
};

export default Router;