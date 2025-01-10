import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "localhost", // Host to connect to from the browser
      protocol: "ws",
      port: 3036,
      clientPort: 3036,
    },
  },
  plugins: [
    solidPlugin(),
    RubyPlugin()
  ],
})
