const envApiBase = import.meta.env.VITE_API_BASE?.trim();

export const API_BASE =
  envApiBase ||
  (import.meta.env.PROD ? window.location.origin : '');

// Debug warning only for local development
if (!envApiBase && !import.meta.env.PROD) {
  console.warn('VITE_API_BASE is not set. API calls will use the current origin.');
}
