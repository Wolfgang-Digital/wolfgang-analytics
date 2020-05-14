import React from 'react';
import { Redirect } from 'react-router-dom';

import { Routes, RouteWithSubrouteProps } from './components/Routes';

const routes: RouteWithSubrouteProps[] = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: () => <h1>Home</h1>
  },
  {
    path: '/clients',
    key: 'CLIENTS',
    component: Routes,
    routes: [
      {
        path: '/clients/new',
        key: 'CLIENT_FORM',
        exact: true,
        component: () => <h1>Clients</h1>
      }
    ]
  }
];

export default routes;