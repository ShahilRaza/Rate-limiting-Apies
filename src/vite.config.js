import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: {
      util: 'node:util',
      stream: 'node:stream',
      crypto: 'node:crypto',
      dns: 'node:dns',
      events: 'node:events',
      net: 'node:net',
      tls: 'node:tls',
      url: 'node:url',
      assert: 'node:assert',
      buffer: 'node:buffer',
      string_decoder: 'node:string_decoder',
    }
  }
});