export const saveToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): Partial<T> | null => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (err) {
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
