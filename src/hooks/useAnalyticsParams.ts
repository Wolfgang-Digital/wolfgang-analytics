import { useReducer, createContext } from 'react';
import { sortBy } from 'lodash';

import { SelectOption } from 'types';

export const metricOptions = sortBy([
  { label: 'Sessions', value: 'sessions' },
  { label: 'Transactions', value: 'transactions' },
  { label: 'Goal Completions', value: 'goalCompletionsAll' },
  { label: 'Goal Conversion Rate', value: 'goalConversionRateAll' },
  { label: 'CPC', value: 'CPC' },
  { label: 'Transaction Revenue', value: 'transactionRevenue' },
  { label: 'Impressions', value: 'impressions' },
  { label: 'Clicks', value: 'adClicks' },
  { label: 'Cost', value: 'adCost' },
  { label: 'CTR', value: 'CTR' },
  { label: 'ROAS', value: 'ROAS' }
], 'label');

export const channelOptions = sortBy([
  { label: 'Organic Search', value: 'organic_search' },
  { label: 'Paid Search', value: 'paid_search' },
  { label: 'Social', value: 'social' },
  { label: 'Direct', value: 'direct' },
  { label: 'Referral', value: 'referral' },
  { label: 'Email', value: 'email' },
  { label: 'Other', value: 'other' },
  { label: 'Display', value: 'display' }
], 'label');

interface State {
  channel: SelectOption | null
  metric: SelectOption | null
  sourceMedium: string
  startDate?: Date
  endDate?: Date
}

const initialState: State = {
  channel: null,
  metric: null,
  sourceMedium: ''
};

export const AnalyticsParamsCTX = createContext(initialState);

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'SET_CHANNEL':
      return {
        ...state,
        channel: action.payload
      };

    case 'SET_METRIC':
      return {
        ...state,
        metric: action.payload
      };

    case 'SET_SOURCE':
      return {
        ...state,
        sourceMedium: action.payload
      };

    case 'SET_DATE_RANGE':
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      };

    default:
      throw new Error();
  }
}

export const useAnalyticsParams = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,
    setChannel: (payload: SelectOption | null) => dispatch({ type: 'SET_CHANNEL', payload }),
    setMetric: (payload: SelectOption | null) => dispatch({ type: 'SET_METRIC', payload }),
    setSource: (payload: string) => dispatch({ type: 'SET_SOURCE', payload }),
    setDateRange: (payload: { startDate: Date, endDate: Date }) => dispatch({ type: 'SET_DATE_RANGE', payload })
  }
};