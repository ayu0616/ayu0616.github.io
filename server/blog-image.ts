import fs from 'node:fs/promises'
import path from 'node:path'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const basedir = import.meta.env.PROD ? '/app' : process.cwd()

export const blogImageApp = new Hono().get(
    '/:slug/:filename',
    zValidator(
        'param',
        z.object({
            slug: z.string().min(1),
            filename: z.string().min(1),
        }),
    ),
    async (c) => {
        const { slug, filename } = c.req.valid('param')
        const globPath = path.join(
            basedir,
            'blog-contents',
            '**',
            slug,
            'assets',
            filename,
        )
        const imagePath = (await fs.glob(globPath).next()).value
        if (!imagePath) {
            return c.json({ error: 'Not Found' }, { status: 404 })
        }
        const buffer = (await fs.readFile(imagePath)).buffer
        if (buffer instanceof ArrayBuffer) {
            return c.body(buffer)
        }
        return c.json({ error: 'Not Found' }, { status: 404 })
    },
)
