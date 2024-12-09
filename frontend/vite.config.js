import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,  // Use the PORT variable provided by Render
  },
}