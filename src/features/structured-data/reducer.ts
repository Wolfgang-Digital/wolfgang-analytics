import { combineReducers } from '@reduxjs/toolkit';

import clients, { initialState as clientsState } from './clients/slice';
import webPages, { initialState as webPageState } from './web-pages/slice';
import entities, { initialState as entityState } from './entities/slice';

export const initialState = {
  clients: clientsState,
  webPages: webPageState,
  entities: entityState
};

export default combineReducers({
  clients,
  webPages,
  entities
});