import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'PUB_');

  return {
    define: {
      PUB_API_BASE_URL: JSON.stringify(env.PUB_API_BASE_URL),
      PUB_API_KEY: JSON.stringify(env.PUB_API_KEY),
    },
    root: path.join(__dirname, 'src'),
    plugins: [react()],
    envPrefix: 'PUB_',
    server: {
      port: 8080,
    },
    build: {
      emptyOutDir: true,
      outDir: path.join(__dirname, 'dist'),
    },
  };
});
