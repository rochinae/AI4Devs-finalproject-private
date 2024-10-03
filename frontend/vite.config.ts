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
      https: true,
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

import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
