import { configureStore, combineReducers } from '@reduxjs/toolkit';

import accountSelect from './features/account-select/slice';

const reducer = combineReducers({
  accountSelect
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof reducer>
export default store;