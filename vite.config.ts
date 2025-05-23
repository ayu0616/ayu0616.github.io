import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import serverAdapter from 'hono-react-router-adapter/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        reactRouter(),
        tsconfigPaths(),
        serverAdapter({
            entry: 'server/index.ts',
        }),
        tailwindcss(),
    ],
    optimizeDeps: {
        exclude: ['@ffmpeg/core', '@ffmpeg/ffmpeg'],
    },
})
