import fs from 'node:fs/promises'
import path from 'node:path'
import { Hono } from 'hono'

const PROD = process.env.NODE_ENV !== 'development' || import.meta.env.PROD

const basedir = process.cwd()

export const blogImageApp = new Hono().get('*', async (c) => {
    const pathList = c.req.path.replace(/^\/blog-image/, '').split('/')
    const filename = pathList.pop() ?? ''
    const dirname = pathList.join('/')
    if (PROD) {
        const res = await fetch(
            path.join(
                'https://storage.googleapis.com/hassaku-blog-contents',
                dirname,
                'assets',
                filename,
            ),
        )
        if (!res.ok) {
            return c.json({ error: 'Not Found' }, { status: 404 })
        }
        const buffer = await res.arrayBuffer()
        c.header('Content-Type', res.headers.get('Content-Type') ?? '')
        c.header('Cache-Control', 'public, immutable, max-age=31536000')
        return c.body(buffer)
    }

    const imagePath = path.join(
        basedir,
        'blog-contents',
        dirname,
        'assets',
        filename,
    )
    const buffer = (await fs.readFile(imagePath)).buffer
    if (buffer instanceof ArrayBuffer) {
        return c.body(buffer)
    }
    return c.json({ error: 'Not Found' }, { status: 404 })
})
