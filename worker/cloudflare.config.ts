import { bindings, defineConfig } from '@cloudflare/config';

// Secrets (TURNSTILE_SECRET, IP_HMAC_KEY, ADMIN_TOKEN) are uploaded with
// `cf deploy --secrets-file`; never commit their values.
export default defineConfig({
  worker: {
    name: 'thufail-leads',
    compatibilityDate: '2026-11-01',
    entrypoint: './src/index.js',
    workersDev: true,
    env: {
      ALLOWED_ORIGINS: bindings.text('https://thufail.dev,http://localhost:5173,http://localhost:5174'),
      DB: bindings.d1({ id: 'b65e02dc-e04d-4f7b-a8d1-1fcfeb015622' }),
      TURNSTILE_SECRET: bindings.secret(),
      IP_HMAC_KEY: bindings.secret(),
      ADMIN_TOKEN: bindings.secret(),
    },
  },
});
