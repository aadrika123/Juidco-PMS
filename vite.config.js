import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-versions-and-internals',
      enforce: 'post',
      apply: 'build',
      generateBundle(_, bundle) {
        Object.keys(bundle).forEach((fileName) => {
          const chunk = bundle[fileName]

          if (chunk.type === 'chunk') {
            // Remove all version information
            chunk.code = chunk.code
              // React versions
              .replace(/version:"[\d\.]+-?[\w-]*"/g, 'version:""')
              .replace(
                /reconcilerVersion:"[\d\.]+-?[\w-]*"/g,
                'reconcilerVersion:""'
              )

              // Package names
              .replace(
                /rendererPackageName:"react-dom"/g,
                'rendererPackageName:""'
              )
              .replace(/rendererPackageName:"[^"]*"/g, 'rendererPackageName:""')

              // Bundle info
              .replace(/bundleType:\d+/g, 'bundleType:0')

              // DevTools hook
              .replace(/__REACT_DEVTOOLS_GLOBAL_HOOK__/g, '__RDH_DISABLED__')

              // Remove any remaining version patterns
              .replace(/"18\.\d+\.\d+[^"]*"/g, '""')
              .replace(/"\d+\.\d+\.\d+-next-[\w-]+"/g, '""')
          }
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
