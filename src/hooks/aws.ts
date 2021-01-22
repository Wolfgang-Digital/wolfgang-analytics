import { useState, useEffect } from 'react';

import { awsGet } from 'utils/api';

export const useAwsGet = <T>(path: string, params?: Record<string, string | number>) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData([]);
      setError(undefined);

      try {
        const res = await awsGet<T>(path, params);
        setIsLoading(false);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.error);
        }
      } catch (e) {
        setIsLoading(false);
        setError(e.toString());
      }
    };
    fetchData();
  }, [path, params]);

  return {
    isLoading,
    error,
    data: data as T
  };
};