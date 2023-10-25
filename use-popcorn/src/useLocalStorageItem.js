import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorageItem } from "./reusableFunctions";

export function useLocalStorageItem(key, initialState) {
  const [value, setValue] = useState(getLocalStorage(key) || initialState);

  useEffect(() => {
    setLocalStorageItem(key, value);
  }, [value, key]);

  return [value, setValue];
}
