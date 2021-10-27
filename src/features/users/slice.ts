import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { awsGet } from 'utils/api';
import { RootState } from 'store';
import { User } from '../profile/slice';

export interface UsersState {
  isLoading: boolean
  users: User[]
  error?: string
}

export const initialState: UsersState = {
  isLoading: false,
  users: []
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/get',
  async (params, { rejectWithValue }) => {
    const res = await awsGet<User[]>('/users');
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.toString()]: state => {
      state.error = undefined;
      state.isLoading = true;
    },

    [fetchUsers.fulfilled.toString()]: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
      state.error = undefined;
      state.isLoading = false;
    },

    [fetchUsers.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.users = [];
      state.isLoading = false;
    },
  }
});

export const getUsersState = (state: RootState) => state.users;

export const getIsLoading = createSelector(
  getUsersState,
  users => users.isLoading
);

export default slice.reducer;