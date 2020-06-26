import { createSlice, createSelector, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { APIPayloadAction, SelectOption } from 'types';
import { RootState } from 'store';
import { awsGet } from 'utils/api';

export const accountOptions = [
  'analytics@wolfgangdigital.com',
  'ga@wolfgangdigital.com',
  'ga.wolfgang@wolfgangdigital.com',
  'g_analytics@wolfgangdigital.com',
  'ga5@wolfgangdigital.com',
  'ga6@wolfgangdigital.com'
]
  .sort()
  .map(value => ({
    label: value,
    value
  }));;

export interface Property {
  id: string
  accountId: string
  name: string
  views: View[]
  accountEmail: string
  accountName: string
}

export interface View {
  id: string
  name: string
}

export interface AccountSelectState {
  selectedAccount: SelectOption | null
  selectedProperty: SelectOption | null
  selectedView: SelectOption | null
  properties: Record<string, Property[]>
  isLoading: boolean
  error?: string
  currentRequestId?: string
}

export const initialState: AccountSelectState = {
  selectedAccount: accountOptions[0],
  selectedProperty: null,
  selectedView: null,
  properties: {},
  isLoading: false,
  error: undefined
};

export const fetchAccountProperties = createAsyncThunk(
  'accountSelect/fetchAccountViews',
  async (account: string) => {
    return await awsGet<Property[]>('/views', { account });
  },
  {
    condition: (account, { getState }) => {
      const state = getState();
      if ((state as RootState).accountSelect.properties[account]) {
        return false;
      }
      return true;
    }
  }
);

const slice = createSlice({
  name: 'accountSelect',
  initialState,
  reducers: {
    setSelectedAccount: (state, { payload }: PayloadAction<SelectOption | null>) => {
      const updateOthers = state.selectedAccount?.value !== payload?.value;
      state.selectedAccount = payload;

      if (updateOthers) {
        state.selectedProperty = null;
        state.selectedView = null;
      }
    },

    setSelectedProperty: (state, { payload }: PayloadAction<SelectOption | null>) => {
      const updateOthers = state.selectedProperty?.value !== payload?.value;
      state.selectedProperty = payload;

      if (updateOthers) {
        state.selectedView = null;
      }
    },

    setSelectedView: (state, { payload }: PayloadAction<SelectOption | null>) => {
      state.selectedView = payload;
    }
  },
  extraReducers: {
    [fetchAccountProperties.pending.toString()]: state => {
      state.isLoading = true;
    },

    [fetchAccountProperties.fulfilled.toString()]: (state, { meta, payload }: APIPayloadAction<Property[]>) => {
      state.isLoading = false;

      if (payload.success) {
        state.properties[meta.arg] = payload.data || [];
      } else {
        state.error = payload.error;
      }
    },

    [fetchAccountProperties.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      console.error(action);
    }
  }
});

export const getSelection = createSelector(
  (state: RootState) => state.accountSelect,
  ({ selectedAccount, selectedProperty, selectedView }) => ({
    selectedAccount,
    selectedProperty,
    selectedView
  })
);

export const getLoadingState = createSelector(
  (state: RootState) => state.accountSelect,
  ({ isLoading, error }) => ({
    isLoading,
    error
  })
);

export const getPropertyOptions = createSelector(
  (state: RootState) => state.accountSelect,
  ({ selectedAccount, properties }) => {
    if (selectedAccount && properties[selectedAccount.value]) {
      return sortBy(properties[selectedAccount.value].map(({ name, id, accountName }) => ({
        label: `${accountName} (${name})`,
        value: id
      })), 'label');
    }
    return [];
  }
);

export const getViewOptions = createSelector(
  (state: RootState) => state.accountSelect,
  ({ selectedAccount, selectedProperty, properties }) => {
    if (selectedAccount && properties[selectedAccount.value] && selectedProperty) {
      const property = properties[selectedAccount.value].find(property => property.id === selectedProperty.value);

      if (property) {
        return property.views.map(({ id, name }) => ({
          label: name,
          value: id
        }));
      }
    }
    return [];
  }
);

export const { setSelectedAccount, setSelectedProperty, setSelectedView } = slice.actions;
export default slice.reducer;