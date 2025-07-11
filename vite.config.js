import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [            // whitelist your host(s)
      'admin.txteams.net',
    ],
    port: 3000,  // ← Dev server will run on http://localhost:300
  },

})
