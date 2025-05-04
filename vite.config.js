// Import Vite's defineConfig helper for better type safety and auto-completion
import { defineConfig } from "vite";
// Import the official Vite plugin to handle React fast refresh, JSX, and more
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig({
  // Plugins section: tell Vite what plugins to use
  plugins: [
    react({
      // Use the new JSX runtime (React 17+) so you don't need `import React` manually
      jsxRuntime: "automatic",
      // Babel configuration inside React plugin
      babel: {
        plugins: [
          // Here you can add custom Babel plugins if needed
          // Example: "babel-plugin-macros",
        ],
      },
    }),
    tailwindcss(),
  ],

  // How Vite resolves imports
  resolve: {
    alias: {
      // Use path.resolve to ensure correct resolution
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },

  // Development server configuration
  server: {
    // Local server will run on port 3000
    port: 3000,
    // Automatically open the browser when server starts
    open: true,
    // Throw error if port 3000 is already used (don't auto-choose another port)
    strictPort: true,
  },

  // Build options when running `vite build`
  build: {
    // Output directory after build is "dist"
    outDir: "dist",
    // Inline files smaller than 4kb as base64 URIs (optimize small images/fonts)
    assetsInlineLimit: 4096, // 4kb
    // Warn if chunk file size is bigger than 1000kb
    chunkSizeWarningLimit: 1000,
    // Advanced bundling options using Rollup
    rollupOptions: {
      output: {
        manualChunks: {
          // Split "react" and "react-dom" into a separate chunk
          react: ["react", "react-dom"],
          // Split "react-router-dom" into another chunk
          router: ["react-router-dom"],
        },
      },
    },
  },

  // Vitest configuration (for testing if you use Vitest)
  test: {
    // Allow global describe(), test(), etc. without import
    globals: true,
    // Simulate a browser-like environment for tests
    environment: "jsdom",
    // Setup file that runs before tests (for global mocks, etc.)
    setupFiles: "./src/test/setup.js",
  },

  // CSS-related configuration
  css: {
    modules: {
      // When using CSS modules, class names will use camelCase only
      localsConvention: "camelCaseOnly",
    },
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      // Force Vite to pre-bundle these libraries for faster dev startup
      "react",
      "react-dom",
      "react-router-dom",
    ],
  },
});
