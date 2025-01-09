import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(),
    RubyPlugin()
  ],
})
