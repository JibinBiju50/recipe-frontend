import { API_BASE } from '../config';

const AUTH_HINT_KEY = 'spoonfull_auth';
const AUTH_EVENT_NAME = 'spoonfull-auth-change';

const setAuthHint = (value) => {
  if (typeof window === 'undefined') return;
  if (value) {
    window.localStorage.setItem(AUTH_HINT_KEY, 'true');
  } else {
    window.localStorage.removeItem(AUTH_HINT_KEY);
  }
  window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: { authenticated: value } }));
};

export const hasAuthHint = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(AUTH_HINT_KEY) === 'true';
};

export const AUTH_CHANGE_EVENT = AUTH_EVENT_NAME;

const fetchCurrentUser = async ({ force = false } = {}) => {
  if (!force && !hasAuthHint()) return null;
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) {
      setAuthHint(false);
      return null;
    }
    const user = await res.json();
    setAuthHint(true);
    return user;
  } catch {
    setAuthHint(false);
    return null;
  }
};

export const register = async (name, email, password) => {
  const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setAuthHint(true);
  return data;
};

export const logout = async () => {
  const res = await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  setAuthHint(false);
  return res.json();
};

export const checkAuth = async () => {
  return Boolean(await fetchCurrentUser());
};

export const getCurrentUser = async () => {
  return fetchCurrentUser();
};

export const rehydrateAuth = async () => {
  return fetchCurrentUser({ force: true });
};

export const refreshToken = async () => {
  const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Unable to refresh token');
  return res.json();
};
