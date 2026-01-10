// Use VITE_API_BASE from .env (set in Vite)
export const API_BASE = import.meta.env.VITE_API_BASE || '';

// Debug: Log warning if API_BASE is not configured
if (!import.meta.env.VITE_API_BASE) {
  console.warn('⚠️ VITE_API_BASE is not set. API calls may fail. Please set this environment variable.');
}