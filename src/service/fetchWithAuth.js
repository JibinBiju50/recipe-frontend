// src/service/fetchWithAuth.js
import { refreshToken } from './authAPI';

export async function fetchWithAuth(url, options = {}) {
  let res = await fetch(url, { ...options, credentials: 'include' });
  if (res.status === 401) {
    try {
      await refreshToken();
      res = await fetch(url, { ...options, credentials: 'include' }); // retry
    } catch {
      // Optionally: handle logout here (clear state, redirect, etc.)
      throw new Error('Session expired. Please log in again.');
    }
  }
  return res;
}