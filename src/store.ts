import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { throttle } from 'lodash';

import { saveState } from 'utils/storage';
import accountSelect, { initialState as accountSelectState } from './features/account-select/slice';
import structuredData, { initialState as structuredDataState } from './features/structured-data/reducer';
import reviews, { initialState as reviewState } from './features/monthly-reviews/slice';
import profile, { initialState as profileState } from './features/profile/slice';

const reducer = combineReducers({
  accountSelect,
  structuredData,
  reviews,
  profile
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {
    accountSelect: accountSelectState,
    structuredData: structuredDataState,
    reviews: reviewState,
    profile: profileState
  }
});

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState('schema.clients', state.structuredData.clients.clients);
  saveState('schema.pages', state.structuredData.webPages.pages);
  saveState('schema.mainEntities', state.structuredData.entities.mainEntities);
}, 1000));

export type RootState = ReturnType<typeof reducer>
export default store;