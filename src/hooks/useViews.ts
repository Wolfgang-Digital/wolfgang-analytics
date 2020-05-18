import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { loadState, saveState } from 'utils/storage';

export interface IProperty {
  id: string
  accountId: string
  name: string
  views: IView[]
}

export interface IView {
  id: string
  accountId: string
  name: string
  webPropertyId: string
  websiteUrl: string
}

export const useViews = (account: string) => {
  const [data, setData] = useState<IProperty[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData([]);

      try {
        const res = await axios.post('https://1si784c8o0.execute-api.eu-west-1.amazonaws.com/prod/views', {
          account
        });

        setIsLoading(false);
        setData(res.data);
        saveState(account, res.data);
      } catch (e) {
        setIsLoading(false);
        setError(e);
      }
    };
    
    const views = loadState(account);

    if (views) {
      setData(views);
    } else {
      fetchData();
    }
  }, [account]);

  return useMemo(() => {
    return {
      isLoading,
      error,
      data
    };
  }, [isLoading, data, error]);
};