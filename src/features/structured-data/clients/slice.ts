import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { loadState } from 'utils/storage';
import { RootState } from 'store';
import { Organisation } from '../types';

export interface ClientsState {
  selectedId: string | null
  filter: string
  clients: Record<string, Organisation>
}

export const initialState: ClientsState = {
  selectedId: null,
  filter: '',
  clients: loadState('schema.clients', {})
};

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedId: (state, { payload }: PayloadAction<string>) => {
      state.selectedId = payload;
    },

    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    },

    createClient: (state, { payload }: PayloadAction<Organisation>) => {
      if (!state.clients[payload.uuid]) {
        state.clients[payload.uuid] = payload;
      }
    },

    updateClient: (state, { payload }: PayloadAction<Organisation>) => {
      if (state.clients[payload.uuid]) {
        state.clients[payload.uuid] = {
          ...state.clients[payload.uuid],
          ...payload
        };
      }
    },

    deleteClient: (state, { payload }: PayloadAction<string>) => {
      delete state.clients[payload];
    },

    deleteAllClients: state => {
      state.clients = {};
    }
  }
});

const getClientState = (state: RootState) => state.structuredData.clients;

export const getClientList = createSelector(
  getClientState,
  ({ clients, filter }) => {
    const filteredList = filter.length > 0
      ? Object.values(clients).filter(client => client.name.toLowerCase().includes(filter.toLowerCase()))
      : Object.values(clients);
    return sortBy(filteredList, 'name') as Organisation[];
  }
);

export const getClients = createSelector(
  getClientState,
  ({ clients }) => clients
);

export const getFilter = createSelector(
  getClientState,
  ({ filter }) => filter
);

export const getSelectedId = createSelector(
  getClientState,
  ({ selectedId }) => selectedId as string
);

export const getSelectedClient = createSelector(
  getClients,
  getSelectedId,
  (clients, id) => id ? clients[id] : undefined
);

export const {
  setSelectedId,
  setFilter,
  createClient,
  updateClient,
  deleteClient,
  deleteAllClients
} = slice.actions;
export default slice.reducer;