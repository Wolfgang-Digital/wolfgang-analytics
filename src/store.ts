import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { throttle } from 'lodash';

import { saveState } from 'utils/storage';
import accountSelect, { initialState as accountSelectState } from './features/account-select/slice';
import structuredData, { initialState as structuredDataState } from './features/structured-data/reducer';
import reviews, { initialState as reviewState } from './features/monthly-reviews/slice';
import profile, { initialState as profileState } from './features/profile/slice';
import awarewolf, { initialState as awarewolfState } from './features/awarewolf/slice';
import pipeline from './features/pipeline/slice';
import users from './features/users/slice';

const reducer = combineReducers({
  accountSelect,
  structuredData,
  reviews,
  profile,
  awarewolf,
  pipeline,
  users
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {
    accountSelect: accountSelectState,
    structuredData: structuredDataState,
    reviews: reviewState,
    profile: profileState,
    awarewolf: awarewolfState
  }
});

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState('schema.clients', state.structuredData.clients.clients);
  saveState('schema.pages', state.structuredData.webPages.pages);
  saveState('schema.mainEntities', state.structuredData.entities.mainEntities);
}, 10000));

export type RootState = ReturnType<typeof reducer>
export default store;