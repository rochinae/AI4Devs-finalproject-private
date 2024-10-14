import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mkcert from 'vite-plugin-mkcert'

const basenameProd = '/react-shadcn-starter'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    base: isProd ? basenameProd : '',
    plugins: [react(), mkcert()],
    server: {
      host: '0.0.0.0', // Listen on all interfaces
      port: 5173, // Ensure this matches the port you're trying to access
      https: false // Set to false if you want to use HTTP
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : '',
      },
    },
  }
})

