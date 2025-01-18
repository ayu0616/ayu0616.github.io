import fs from 'node:fs/promises'
import path from 'node:path'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'

type Params = {
    route: string[]
}

const basedir = process.env.NODE_ENV === 'production' ? '/app' : process.cwd()

const app = new Hono().basePath('/blog-image').get(
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

export const GET = handle(app)
