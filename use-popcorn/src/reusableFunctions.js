export function getLocalStorage(key) {
  const storedValue = JSON.parse(localStorage.getItem(key));
  return storedValue;
}

export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
