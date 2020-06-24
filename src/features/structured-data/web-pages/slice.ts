import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { loadState } from 'utils/storage';
import { WebPage } from '../types';
import { deleteAllClients, deleteClient } from '../clients/slice';

export interface WebPageState {
  pages: Record<string, WebPage>
}

export const initialState: WebPageState = {
  pages: loadState('schema.pages', {})
};

const slice = createSlice({
  name: 'webPages',
  initialState,
  reducers: {
    createWebPage: (state, { payload }: PayloadAction<WebPage>) => {
      if (!state.pages[payload.uuid]) {
        state.pages[payload.uuid] = payload;
      }
    },

    updateWebPage: (state, { payload }: PayloadAction<WebPage>) => {
      if (state.pages[payload.uuid]) {
        state.pages[payload.uuid] = {
          ...state.pages[payload.uuid],
          ...payload
        };
      }
    },

    deleteWebPage: (state, { payload }: PayloadAction<string>) => {
      delete state.pages[payload];
    }
  },
  extraReducers: {
    [deleteClient.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.pages = Object.values(state.pages).reduce((result: Record<string, WebPage>, page) => {
        if (page.clientId !== payload) {
          result[page.uuid] = page as WebPage;
        }
        return result;
      }, {});
    },

    [deleteAllClients.toString()]: state => {
      state.pages = {};
    }
  }
});

const getWebPageState = (state: RootState) => state.structuredData.webPages;

export const getWebPages = createSelector(
  getWebPageState,
  pages => pages.pages as Record<string, WebPage>
);

export const {
  createWebPage,
  updateWebPage,
  deleteWebPage
} = slice.actions;
export default slice.reducer;