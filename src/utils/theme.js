import { useSyncExternalStore } from 'react';

// The theme lives on <html data-theme>, set before first paint by the inline
// script in index.html. Reading it through an external store keeps the
// prerendered markup (always "dark") and the hydrated UI in agreement.
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
const getServerSnapshot = () => 'dark';

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage unavailable (private mode etc.) — the theme still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
