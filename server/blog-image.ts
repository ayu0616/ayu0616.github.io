import fs from 'node:fs/promises'
import path from 'node:path'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { GCS_URL, PROD } from '~/constant/others'
import { urlJoin } from '~/util/url'

const basedir = process.cwd()

export const blogImageApp = new Hono().get(
    '/:filename',
    zValidator('param', z.object({ filename: z.string().min(1) })),
    async (c) => {
        const { filename } = c.req.valid('param')
        if (PROD) {
            const res = await fetch(urlJoin(GCS_URL, 'assets', filename))
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
            'assets',
            filename,
        )
        const buffer = (await fs.readFile(imagePath)).buffer
        const ext = path.extname(filename)
        const contentType = (() => {
            switch (ext) {
                case '.webp':
                    return 'image/webp'
                case '.png':
                    return 'image/png'
                case '.jpg':
                case '.jpeg':
                    return 'image/jpeg'
                case '.gif':
                    return 'image/gif'
                case '.svg':
                    return 'image/svg+xml'
                default:
                    return 'application/octet-stream'
            }
        })()
        c.header('Content-Type', contentType)
        if (buffer instanceof ArrayBuffer) {
            return c.body(buffer)
        }
        return c.json({ error: 'Not Found' }, { status: 404 })
    },
)
