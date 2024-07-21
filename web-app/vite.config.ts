import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";


export default defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
      path: "path-browserify",
      os: "os-browserify",
      stream: "stream-browserify"
    }
  },
  plugins: [
    sveltekit(),
    nodePolyfills({
      exclude: ["fs"],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  ]
});
