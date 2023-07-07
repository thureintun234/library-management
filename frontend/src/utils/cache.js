export const CACHE_KEY = import.meta.env.REACT_APP_CACHE_KEY;

const key = CACHE_KEY || "__libraryshadow";

export const storeCache = (name, value) => {
  localStorage.setItem(`${key}${name}`, value);
};

export const getCache = (name) => {
  localStorage.getItem(`${key}${name}`);
};

export const removeCache = (name) => {
  localStorage.removeItem(`${key}${name}`);
};
