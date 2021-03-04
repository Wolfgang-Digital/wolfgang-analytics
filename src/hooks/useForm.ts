import { useReducer } from 'react';

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

export function useForm<T>(initialState: T) {
  const [state, dispatch] = useReducer((state: T, action: FormAction<T>) => reducer<T>(state, action), initialState);
  return { form: state, updateForm: dispatch };
};