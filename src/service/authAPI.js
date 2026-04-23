import { API_BASE } from '../config';

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
  return data;
};

export const logout = async () => {
  const res = await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
};

export const checkAuth = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const getCurrentUser = async () => {
  const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
};

export const refreshToken = async () => {
  const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Unable to refresh token');
  return res.json();
};
