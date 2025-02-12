import { reactRouter } from '@react-router/dev/vite'
import serverAdapter from 'hono-react-router-adapter/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    css: {
        postcss: {
            // plugins: [tailwindcss, autoprefixer],
        },
    },
    plugins: [
        reactRouter(),
        tsconfigPaths(),
        serverAdapter({
            entry: 'server/index.ts',
        }),
    ],
})
