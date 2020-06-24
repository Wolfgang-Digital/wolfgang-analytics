import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useLinkHandler = () => {
  const history = useHistory();

  return useCallback((to: string) => {
    history.push(to);
  }, [history]);
};