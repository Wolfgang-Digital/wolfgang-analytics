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
    component: lazy(() => import('./features/forecast/ForecastPage'))
  },
  {
    path: '/views',
    key: 'VIEWS',
    component: lazy(() => import('./features/account-select/AccountSelect'))
  }
];

export default routes;