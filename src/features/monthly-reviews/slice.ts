import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { isBefore, isAfter } from 'date-fns';

import default_templates from 'data/monthly_review_templates.json';
import { RootState } from 'store';
import { loadState } from 'utils/storage';
import { awsGet, awsPost } from 'utils/api';
import { ReviewTemplate, ReviewResponse, ResponseUpdate } from './types';

export interface ReviewsState {
  isLoading: boolean
  templates: ReviewTemplate[]
  reviewResponse?: ReviewResponse
  errorMessage?: string
}

export const initialState: ReviewsState = {
  isLoading: false,
  templates: default_templates.map(template => ({
    ...template,
    pillars: template.pillars.map(pillar => ({ value: pillar })),
    metrics: template.metrics.map(metric => ({ value: metric })),
    questions: template.questions.map(question => ({
      value: {
        ...question,
        questions: question.questions.map(text => ({ value: text }))
      }
    }))
  })).concat(loadState('reviewTemplates', []))
};

export const fetchResponses = createAsyncThunk<ReviewResponse, number>(
  'reviews/responses/get',
  async (id, { rejectWithValue }) => {
    const res = await awsGet<ReviewResponse>(`/reviews/r/${id}`);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const updateResponse = createAsyncThunk<ResponseUpdate, { id: number, role: 'MANAGER' | 'EMPLOYEE', formData: any }>(
  'reviews/responses/update',
  async ({ id, role, formData }, { rejectWithValue }) => {
    const res = await awsPost<ResponseUpdate>(`/reviews/response/${id}`, { role, formData });
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
)

const slice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    createTemplate: (state, { payload }: PayloadAction<ReviewTemplate>) => {
      state.templates.push(payload);
    },
  },
  extraReducers: {
    [fetchResponses.pending.toString()]: (state) => {
      state.errorMessage = undefined;
      state.isLoading = true;
    },

    [fetchResponses.fulfilled.toString()]: (state, { payload }: PayloadAction<ReviewResponse>) => {
      state.reviewResponse = {
        ...payload,
        responses: payload.responses?.sort((a, b) => {
          return isBefore(new Date(a.review_date), new Date(b.review_date)) ? 1 : isAfter(new Date(a.review_date), new Date(b.review_date)) ? -1 : 0;
        })
      };
      state.isLoading = false;
    },

    [fetchResponses.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },

    [updateResponse.pending.toString()]: (state) => {
      state.errorMessage = undefined;
      state.isLoading = true;
    },

    [updateResponse.fulfilled.toString()]: (state, { payload }: PayloadAction<ResponseUpdate>) => {
      const index = state.reviewResponse?.responses.findIndex(r => r.response_id === payload.response_id);
      if (index && !!state.reviewResponse?.responses[index]) {
        state.reviewResponse.responses[index] = payload;
      }
      state.isLoading = false;
    },

    [updateResponse.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    }
  }
});

const getReviewState = (state: RootState) => state.reviews;

export const getTemplateOptions = createSelector(
  getReviewState,
  state => [{ label: 'None', value: {} as any }].concat(state.templates.map(template => ({ label: template.name, value: template })))
);

export const getResponse = createSelector(
  getReviewState,
  state => ({
    isLoading: state.isLoading,
    data: state.reviewResponse,
    error: state.errorMessage
  })
);

export const getIsLoading = createSelector(
  getReviewState,
  state => state.isLoading
);

export const getSavedTemplates = createSelector(
  getReviewState,
  state => {
    return state.templates.filter(template => template.name !== 'Default');
  }
);

export const { createTemplate } = slice.actions;
export default slice.reducer;