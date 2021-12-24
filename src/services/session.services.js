import { clearUserData } from '../redux/actions';

export const setSessionItem = (key, value) => {
  if (!localStorage) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = (key) => {
  if (!localStorage) return;

  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return localStorage.getItem(key);
  }
};

export const removeSessionItem = (key) => {
  if (!localStorage) return;

  clearUserData();
  return localStorage.removeItem(key);
};

export const clearSession = () => {
  return localStorage.clear();
};
