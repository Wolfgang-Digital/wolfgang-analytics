import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';

export interface RouteWithSubrouteProps extends Pick<RouteProps, 'path' | 'exact'> {
  key: string;
  component?: any;
  routes?: Omit<RouteWithSubrouteProps, 'routes'>[];
}

export const RouteWithSubroutes: React.FC<RouteWithSubrouteProps> = ({ path, exact, routes, component: Component }) => {
  return <Route path={path} exact={exact} render={props => <Component {...props} routes={routes} />} />;
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
