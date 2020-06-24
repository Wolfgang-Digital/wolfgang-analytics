import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { loadState } from 'utils/storage';
import { Entity } from '../types';
import { deleteAllClients, deleteClient } from '../clients/slice';
import { deleteWebPage } from '../web-pages/slice';

interface EntityState {
  mainEntities: Record<string, Entity>
}

export const initialState: EntityState = {
  mainEntities: loadState('schema.mainEntities', {})
};

const slice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    createMainEntity: (state, { payload }: PayloadAction<Entity>) => {
      if (!state.mainEntities[payload.uuid]) {
        state.mainEntities[payload.uuid] = payload;
      }
    },

    updateMainEntity: (state, { payload }: PayloadAction<Entity>) => {
      if (state.mainEntities[payload.uuid]) {
        state.mainEntities[payload.uuid] = {
          ...state.mainEntities[payload.uuid],
          ...payload
        };
      }
    },

    deleteMainEntity: (state, { payload }: PayloadAction<string>) => {
      delete state.mainEntities[payload];
    }
  },
  extraReducers: {
    [deleteAllClients.toString()]: state => {
      state.mainEntities = {};
    },

    [deleteClient.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.mainEntities = Object.values(state.mainEntities).reduce((result: Record<string, Entity>, entity) => {
        if (entity.clientId !== payload) {
          result[entity.uuid] = entity as Entity;
        }
        return result;
      }, {});
    },

    [deleteWebPage.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.mainEntities = Object.values(state.mainEntities).reduce((result: Record<string, Entity>, entity) => {
        if (entity.pageId !== payload) {
          result[entity.uuid] = entity as Entity;
        }
        return result;
      }, {});
    }
  }
});

const getEntityState = (state: RootState) => state.structuredData.entities;

export const getMainEntities = createSelector(
  getEntityState,
  state => state.mainEntities as Record<string, Entity>
);

export const getMainEntityList = createSelector(
  getMainEntities,
  entities => {
    return Object.values(entities);
  }
);

export const getMainEntityOnPage = (pageId: string) => createSelector(
  getMainEntities,
  entities => {
    return Object.values(entities).find(entity => entity.pageId === pageId);
  }
);

export const {
  createMainEntity,
  updateMainEntity,
  deleteMainEntity
} = slice.actions;

export default slice.reducer;