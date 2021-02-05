import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { awsGet, awsPost } from 'utils/api';
import { RootState } from 'store';

export interface User {
  user_id: string
  username: string
  email: string
  roles?: {
    role_id: number
    role_name: string
  }[]
  departments: {
    department_id: number
    department_name: string
  }[]
}

export interface Notification {
  icon?: string
  text: string
  actionUrl?: string
}

export interface ProfileState {
  isLoading: boolean
  user?: User
  error?: string
  notifications: Notification[]
}

export const initialState: ProfileState = {
  isLoading: false,
  notifications: []
};

export const fetchCurrentUser = createAsyncThunk<User>(
  'users/me/get',
  async (params, { rejectWithValue }) => {
    const res = await awsGet<User>('/users/me');
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const updateCurrentUser = createAsyncThunk<User, { key: string, value: any }>(
  'users/me/post',
  async (params, { rejectWithValue }) => {
    const res = await awsPost<User>('/users/me', params);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const fetchNotifications = createAsyncThunk<Notification[]>(
  'users/notifications/get',
  async (params, { rejectWithValue }) => {
    const res = await awsGet<Notification[]>('/users/me/notifications');
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },

  extraReducers: {
    // Fetch current user
    [fetchCurrentUser.pending.toString()]: state => {
      state.error = undefined;
      state.isLoading = true;
    },

    [fetchCurrentUser.fulfilled.toString()]: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.error = undefined;
      state.isLoading = false;
    },

    [fetchCurrentUser.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.user = undefined;
      state.isLoading = false;
    },

    // Update current user
    [updateCurrentUser.pending.toString()]: state => {
      state.error = undefined;
      state.isLoading = true;
    },

    [updateCurrentUser.fulfilled.toString()]: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.error = undefined;
      state.isLoading = false;
    },

    [updateCurrentUser.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.user = undefined;
      state.isLoading = false;
    },

    // Fetch notifications
    [fetchNotifications.pending.toString()]: state => {
      state.notifications = [];
      state.isLoading = true;
    },

    [fetchNotifications.fulfilled.toString()]: (state, { payload }: PayloadAction<Notification[]>) => {
      state.notifications = payload;
      state.error = undefined;
      state.isLoading = false;
    },

    [fetchNotifications.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.notifications = [];
      state.isLoading = false;
    }
  }
});

const getProfileState = (state: RootState) => state.profile;

export const getCurrentUser = createSelector(
  getProfileState,
  profile => profile
);

export const getNotifications = createSelector(
  getProfileState,
  profile => profile.notifications
);

export default slice.reducer;