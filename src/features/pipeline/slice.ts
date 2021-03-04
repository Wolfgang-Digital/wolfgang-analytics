import { createSlice, createSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { awsGet, awsPost } from 'utils/api';

export interface PipelineEntry {
  id: number
  company_name: string
  is_new: boolean
  created_at: string
  updated_at: string
  country?: string
  source?: string
  source_comment?: string
  led_by: string
  channels: string[]
  lead_contact_date?: string
  seo_fmv?: number
  ppc_fmv?: number
  twelve_month_value?: number
}

export interface PipelineState {
  isLoading: boolean
  error?: string
  data: PipelineEntry[]
}

export const fetchEntries = createAsyncThunk<PipelineEntry[]>(
  'pipline/entries/get',
  async (params, { rejectWithValue }) => {
    const res = await awsGet<PipelineEntry[]>('/pipeline');
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const createEntry = createAsyncThunk<PipelineEntry, Partial<PipelineEntry>>(
  'pipline/entries/post',
  async (params, { rejectWithValue }) => {
    const res = await awsPost<PipelineEntry>('/pipeline', params);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const initialState: PipelineState = {
  isLoading: false,
  data: []
};

const slice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEntries.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
    },

    [fetchEntries.fulfilled.toString()]: (state, { payload }: PayloadAction<PipelineEntry[]>) => {
      state.isLoading = false;
      state.error = undefined;
      state.data = payload;
    },

    [fetchEntries.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },

    [createEntry.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
    },

    [createEntry.fulfilled.toString()]: (state, { payload }: PayloadAction<PipelineEntry>) => {
      state.isLoading = false;
      state.error = undefined;
      state.data.unshift(payload);
    },

    [createEntry.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

const getPipelineState = (state: RootState) => state.pipeline;

export const getStatus = createSelector(
  getPipelineState,
  state => ({
    isLoading: state.isLoading,
    error: state.error
  })
);

export const getEntries = createSelector(
  getPipelineState,
  state => state.data
);

export default slice.reducer;