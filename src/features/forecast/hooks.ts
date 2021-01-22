import { useState } from 'react';

import { awsGet } from './utils';

interface Params {
  gaAccount: string
  viewId: string
  metric: string
  startDate: string
  endDate: string
  numDays: number
  channel?: string
  sourceMedium?: string
}

export interface Forecast {
  ds: number
  y: number
  yhat: number
  yhat_lower: number
  yhat_upper: number
  agg: string
}

export const useForecast = () => {
  const [data, setData] = useState<Forecast[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchData = async (params: Params) => {
    setIsLoading(true);
    setData([]);
    setError(undefined);

    try {
      const res = await awsGet('/forecast', params);

      setIsLoading(false);

      if (res.success) {
        setData(JSON.parse(res.data as string) as Forecast[]);
      } else {
        if (res.error.includes('Network Error')) setError('Network timeout. Try narrowing the sample range or decreasing the number of days');
        else setError(res.error);
      }
    } catch (e) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  return {
    fetchData,
    isLoading,
    error,
    data
  };
};