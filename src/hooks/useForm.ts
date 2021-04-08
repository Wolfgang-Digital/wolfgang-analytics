import { useReducer, useState, useMemo } from 'react';

interface FormAction<T> {
  key: keyof T
  value: T[FormAction<T>['key']]
}

function reducer<T>(state: T, action: FormAction<T>) {
  return {
    ...state,
    [action.key]: action.value
  } as T;
};

export function useForm<T>(initialState: T, key?: string) {
  const [_key, setKey] = useState(key);
  const [state, dispatch] = useReducer((state: T, action: FormAction<T>) => reducer<T>(state, action), initialState);

  useMemo(() => {
    if (key && key !== _key) {
      setKey(key);
      Object.entries(initialState).forEach(([k, v]) => {
        dispatch({ key: k as keyof T, value: v });
      });
    }
  }, [key, _key, initialState]);

  return { form: state, updateForm: dispatch };
};