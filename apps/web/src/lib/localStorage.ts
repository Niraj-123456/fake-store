export function writeToLocalStorage(
  key: string,
  value: string | boolean | Object
) {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function readFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}
