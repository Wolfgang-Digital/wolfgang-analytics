import { lazy } from 'react';

import { RouteWithSubrouteProps } from './components/Routes';

const routes: RouteWithSubrouteProps[] = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: lazy(() => import('./pages/Home'))
  },
  {
    path: '/forecast',
    key: 'FORECAST',
    component: lazy(() => import('./pages/Forecast'))
  }
];

export default routes;