import { lazy } from 'react';

import { RouteWithSubrouteProps, Routes } from './components/Routes';

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
    exact: true,
    component: lazy(() => import('./features/forecast/ForecastPage'))
  },
  {
    path: '/structured-data',
    key: 'STRUCTURED_DATA',
    component: Routes,
    routes: [
      {
        path: '/structured-data',
        key: 'STRUCTURED_DATA_INDEX',
        exact: true,
        component: lazy(() => import('./features/structured-data/clients/ClientPage'))
      },
      {
        path: '/structured-data/create-client',
        key: 'CREATE_CLIENT',
        exact: true,
        component: lazy(() => import('./features/structured-data/clients/CreateClientPage'))
      },
      {
        path: '/structured-data/clients/:clientId',
        key: 'UPDATE_CLIENT',
        exact: true,
        component: lazy(() => import('./features/structured-data/clients/CreateClientPage'))
      },
      {
        path: '/structured-data/create-page',
        key: 'CREATE_PAGE',
        exact: true,
        component: lazy(() => import('./features/structured-data/web-pages/PageForm'))
      },
      {
        path: '/structured-data/pages/:pageId',
        key: 'UPDATE_PAGE',
        exact: true,
        component: lazy(() => import('./features/structured-data/web-pages/PageForm'))
      },
      {
        path: '/structured-data/pages/:pageId/main-entity',
        key: 'UPDATE_PAGE',
        exact: true,
        component: lazy(() => import('./features/structured-data/entities/CreateEntityPage'))
      },
      {
        path: '/structured-data/pages/:pageId/schema',
        key: 'UPDATE_PAGE',
        exact: true,
        component: lazy(() => import('./features/structured-data/SchemaPage'))
      }
    ]
  },
  {
    path: '/user',
    key: 'USER',
    component: Routes,
    routes: [
      {
        path: '/user/monthly-reviews',
        key: 'REVIEWS',
        component: lazy(() => import('./pages/Reviews'))
      }
    ]
  }
];

export default routes;
