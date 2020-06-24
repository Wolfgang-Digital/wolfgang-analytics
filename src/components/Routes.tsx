import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';
import { PseudoBox } from '@chakra-ui/core';

export interface RouteWithSubrouteProps extends Pick<RouteProps, 'path' | 'exact'> {
  key: string;
  component?: any;
  routes?: Omit<RouteWithSubrouteProps, 'routes'>[];
}

export const RouteWithSubroutes: React.FC<RouteWithSubrouteProps> = ({ path, exact, routes, component: Component }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => (
        <PseudoBox animation="fadeIn 300ms ease-in-out">
          <Component {...props} routes={routes} />
        </PseudoBox>
      )}
    />
  );
};

export const Routes: React.FC<{ routes: RouteWithSubrouteProps[] }> = ({ routes }) => {
  return (
    <Switch>
      {routes.map(route => (
        <RouteWithSubroutes {...route} />
      ))}
    </Switch>
  );
};
