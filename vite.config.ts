import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react-swc'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'

const options = {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), { enforce: 'pre', ...mdx(options) }],
})
