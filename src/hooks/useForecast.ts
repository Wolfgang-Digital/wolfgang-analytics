import { useState } from 'react';
import axios from 'axios';

interface Params {
  gaAccount: string,
  viewId: string,
  metric: string,
  startDate: string,
  endDate: string,
  numDays: number
}

export interface IForecast {
  ds: number
  y: number
  yhat: number
  yhat_lower: number
  yhat_upper: number
}

export const useForecast = () => {
  const [data, setData] = useState<IForecast[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchData = async (params: Params) => {
    setIsLoading(true);
    setData([]);

    try {
      const res = await axios.get('https://1si784c8o0.execute-api.eu-west-1.amazonaws.com/prod/forecast', {
        params
      });

      setIsLoading(false);
      setData(JSON.parse(res.data));
    } catch (e) {
      setIsLoading(false);
      setError(e.response.data.error);
    }
  };

  return {
    fetchData,
    isLoading,
    error,
    data
  };
};