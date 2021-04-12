import { createSlice, createSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { awsGet, awsPost } from 'utils/api';
import { PipelineEntry, PipelineFilter } from './types';
import { getFilterQuery } from './utils';

export interface PipelineState {
  isLoading: boolean
  error?: string
  message?: string
  data: PipelineEntry[]
  current?: PipelineEntry
  filters: PipelineFilter[]
  currentTab: 'ENQUIRY' | 'PROPOSAL' | 'MONEY'
  offset: number
  limit: number
  query: string
  total: number
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
  values: Record<string, any>
}>(
  'pipline/entry/update',
  async ({ id, values }, { rejectWithValue }) => {
    const res = await awsPost<PipelineEntry>(`/pipeline/e/${id}`, values);
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
  filters: [{
    column: 'Status',
    operator: 'is',
    value: 'Open'
  }],
  currentTab: 'ENQUIRY',
  offset: 0,
  limit: 20,
  total: 0,
  query: ''
};

const slice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    addFilter: (state, { payload }: PayloadAction<PipelineFilter>) => {
      state.filters = state.filters.filter(filter => filter.column !== payload.column);
      state.filters.push(payload);
    },

    removeFilter: (state, { payload }: PayloadAction<PipelineFilter>) => {
      state.filters = state.filters.filter(filter => filter.column !== payload.column)
    },

    clearFilters: state => {
      state.filters = [];
    },

    setTab: (state, { payload }: PayloadAction<PipelineState['currentTab']>) => {
      state.currentTab = payload;
    },

    incrementOffset: state => {
      state.offset += state.limit;
    },

    decrementOffset: state => {
      state.offset = Math.max(0, state.offset - state.limit);
    },

    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },

    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setCurrentEntry: (state, { payload }: PayloadAction<number>) => {
      state.current = state.data.find(e => e.id === payload);
    }
  },
  extraReducers: {
    [fetchEntries.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
      state.message = undefined;
    },

    [fetchEntries.fulfilled.toString()]: (state, { payload }: PayloadAction<PipelineEntry[]>) => {
      state.isLoading = false;
      state.error = undefined;
      state.data = payload;
      state.total = payload[0]?.total || 0;
    },

    [fetchEntries.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },

    [createEntry.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
      state.message = undefined;
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
      state.message = undefined;
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
      state.message = undefined;
    },

    [updateEntry.fulfilled.toString()]: (state, { payload }: PayloadAction<PipelineEntry>) => {
      state.isLoading = false;
      state.error = undefined;
      state.current = payload;
      state.message = `${payload.company_name} updated successfully`;
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
    error: state.error,
    message: state.message
  })
);

export const getEntries = createSelector(
  getPipelineState,
  state => state.data
);

export const getPagination = createSelector(
  getPipelineState,
  state => {
    return {
      total: state.total,
      current: state.data.length,
      offset: state.offset,
      limit: state.limit
    };
  }
);

export const getCurrentEntry = createSelector(
  getPipelineState,
  state => state.current
);

export const getFilters = createSelector(
  getPipelineState,
  state => state.filters
);

export const getCurrentTab = createSelector(
  getPipelineState,
  state => state.currentTab
);

export const getQuery = createSelector(
  getPipelineState,
  state => state.query
);

export const getQueryString = createSelector(
  getFilters,
  getQuery,
  getPagination,
  (filters, q, page) => {
    let query = filters.reduce((query, filter) => {
      if (query.length > 0) query += '&';
      query += getFilterQuery(filter);
      return query;
    }, '');
    if (q.length > 0) {
      if (query.length > 0) query += `&q=${q}`;
      else query = `q=${q}`;
    }
    query += `&offset=${page.offset}&limit=${page.limit}`
    if (query.length > 0) return `?${query}`;
    return '';
  }
);

export const {
  addFilter,
  removeFilter,
  clearFilters,
  setTab,
  setQuery,
  setIsLoading,
  setCurrentEntry,
  incrementOffset,
  decrementOffset
} = slice.actions;
export default slice.reducer;