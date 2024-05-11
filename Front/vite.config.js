import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Siskoolbe/',
  server: {
    host: '192.168.0.200',
    port: 5173,
    cors: true,
    // https: {
    //   key: 'c:/React/Siskoolbe/key.pem',
    //   cert: 'c:/React/Siskoolbe/cert.pem',
    // }
  }
})
