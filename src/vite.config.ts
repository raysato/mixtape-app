import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  server: {
    hmr: {
        host: "localhost",
        protocol: "ws",
    },
  },
  plugins: [
    solidPlugin(),
    RubyPlugin()
  ],
})
