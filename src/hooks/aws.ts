import { useState, useEffect } from 'react';

import { awsGet, cancelToken } from 'utils/api';

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

        if (res.success) {
          setData(res.data);
        } else {
          setError(res.error);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(e.toString());
      }
    };
    fetchData();

    return () => {
      cancelToken.cancel();
    };
  }, [path, params]);

  return {
    isLoading,
    error,
    data: data as T
  };
};