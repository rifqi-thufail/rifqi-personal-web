import { useSyncExternalStore } from 'react';

// Browser-only values read through external stores: the prerendered markup gets
// the server fallback, and React swaps in the real value right after hydration.
const noop = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function useIsMac() {
  return useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => false,
  );
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
