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

export interface PipelineFilter {
  column: { label: string, value: string }
  operator: { label: string, value: string }
  value: string | number
}

export interface PipelineState {
  isLoading: boolean
  error?: string
  data: PipelineEntry[]
  current?: PipelineEntry
  filters: PipelineFilter[]
}

export const fetchEntries = createAsyncThunk<PipelineEntry[], string | undefined>(
  'pipline/entries/get',
  async (params, { rejectWithValue }) => {
    const res = await awsGet<PipelineEntry[]>(`/pipeline/${params || ''}`);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const fetchEntry = createAsyncThunk<PipelineEntry, number | string>(
  'pipline/entry/getById',
  async (id, { rejectWithValue }) => {
    const res = await awsGet<PipelineEntry>(`/pipeline/e/${id}`);
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

export const updateEntry = createAsyncThunk<PipelineEntry, {
  id: string | number,
  key: string,
  value?: string | boolean | string[] | number
}>(
  'pipline/entry/update',
  async ({ id, key, value }, { rejectWithValue }) => {
    const res = await awsPost<PipelineEntry>(`/pipeline/e/${id}`, { key, value });
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const initialState: PipelineState = {
  isLoading: false,
  data: [],
  filters: []
};

const slice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    addFilter: (state, { payload }: PayloadAction<PipelineFilter>) => {
      if (!state.filters.find(filter => filter.column.value === payload.column.value)) {
        state.filters.push(payload);
      }
    },

    removeFilter: (state, { payload }: PayloadAction<PipelineFilter>) => {
      state.filters = state.filters.filter(filter => filter.column.value !== payload.column.value)
    },

    clearFilters: state => {
      state.filters = [];
    }
  },
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
    },

    [fetchEntry.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
    },

    [fetchEntry.fulfilled.toString()]: (state, { payload }: PayloadAction<PipelineEntry>) => {
      state.isLoading = false;
      state.error = undefined;
      state.current = payload;
    },

    [fetchEntry.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },

    [updateEntry.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
    },

    [updateEntry.fulfilled.toString()]: (state, { payload }: PayloadAction<PipelineEntry>) => {
      state.isLoading = false;
      state.error = undefined;
      state.current = payload;
    },

    [updateEntry.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
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

export const getCurrentEntry = createSelector(
  getPipelineState,
  state => state.current
);

export const getFilters = createSelector(
  getPipelineState,
  state => state.filters
);

export const getQueryString = createSelector(
  getFilters,
  filters => {
    const query = filters.reduce((query, filter) => {
      if (query.length > 0) query += '&';
      query += `${filter.column.value}=${filter.operator.value} ${filter.value}`;
      return query;
    }, '');
    if (query.length > 0) return `?${query}`;
    return '';
  }
);

export const { addFilter, removeFilter, clearFilters } = slice.actions;
export default slice.reducer;