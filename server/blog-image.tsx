import fs from 'node:fs/promises'
import path from 'node:path'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import satori from 'satori'
import { z } from 'zod'
import { BASE_URL, GCS_URL, PROD } from '~/constant/others'
import { urlJoin } from '~/util/url'
import { getBlogThumbnail } from './api/blog'

const fontPath = PROD ? 'build/client/fonts' : 'public/fonts'
const bizUdpGothic = fs.readFile(
    path.join(fontPath, 'BIZUDPGothic-Regular.ttf'),
)

const basedir = process.cwd()

export const blogImageApp = new Hono()
    // // get blog thumbnail image
    .get(
        '/:slug/thumbnail',
        zValidator('param', z.object({ slug: z.string().min(1) })),
        async (c) => {
            const { slug } = c.req.valid('param')
            const filename = await getBlogThumbnail(slug)
            if (!filename) {
                c.header('Content-Type', 'image/svg+xml')
                return c.body(
                    await satori(
                        <div
                            tw="bg-gray-300 flex justify-center items-center text-white text-lg"
                            style={{ width: 128, height: 128 }}
                        >
                            NO IMAGE
                        </div>,
                        {
                            width: 128,
                            height: 128,
                            fonts: [
                                {
                                    name: 'BIZ UDPGothic',
                                    data: await bizUdpGothic,
                                    weight: 400,
                                    style: 'normal',
                                },
                            ],
                        },
                    ),
                )
            }
            return fetch(urlJoin(BASE_URL, '/blog-image', filename))
        },
    )
    // get image at blog page
    .get(
        '/:filename',
        zValidator('param', z.object({ filename: z.string().min(1) })),
        async (c) => {
            const { filename } = c.req.valid('param')
            if (PROD) {
                return fetch(urlJoin(GCS_URL, 'assets', filename))
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
