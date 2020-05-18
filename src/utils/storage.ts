export const saveState = (key: string, data: any) => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn(e);
  }
}

export const loadState = (key: string, defaultState?: any) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return defaultState;
  }
};