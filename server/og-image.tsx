import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import satori from 'satori'
import sharp from 'sharp'
import { z } from 'zod'

import fs from 'node:fs'
import path from 'node:path'

const bizUdpGothic = fs.readFileSync(
    path.join('public', 'fonts', 'BIZUDPGothic-Regular.ttf'),
)
const bizUdpGothicBold = fs.readFileSync(
    path.join('public', 'fonts', 'BIZUDPGothic-Bold.ttf'),
)

declare module 'react' {
    interface HTMLAttributes<T> {
        tw?: string
    }
}

const size = {
    height: 630,
    width: 1200,
}

export const ogImageApp = new Hono().basePath('/og-image').get(
    '/',
    zValidator(
        'query',
        z.object({
            title: z.string().min(1).optional(),
        }),
    ),
    async (c) => {
        const { title } = c.req.valid('query')
        const mainText = title ?? 'はっさくゼリー製造工場'
        const subText = title
            ? 'はっさくゼリー製造工場'
            : '食品の製造販売等は行っておりません'
        const svg = await satori(
            <div
                lang="ja-JP"
                style={{
                    ...size,
                    fontFamily: 'BIZ UDPGothic sans-serif',
                }}
                tw="flex"
            >
                <div tw="flex items-center justify-center bg-emerald-700 py-[50px] size-full">
                    <div tw="h-full w-full items-center justify-center bg-white flex">
                        <div tw="flex-col flex w-full px-[75px]">
                            <h1 tw="font-bold text-[72px]">{mainText}</h1>
                            <p tw="text-[32px] text-gray-700">{subText}</p>
                        </div>
                    </div>
                </div>
            </div>,
            {
                ...size,
                fonts: [
                    {
                        name: 'BIZ UDPGothic',
                        data: bizUdpGothic,
                        weight: 400,
                        style: 'normal',
                    },
                    {
                        name: 'BIZ UDPGothic',
                        data: bizUdpGothicBold,
                        weight: 700,
                        style: 'normal',
                    },
                ],
            },
        )
        const webp = await sharp(Buffer.from(svg)).webp().toBuffer()
        c.header('Content-Type', 'image/webp')
        c.header('Cache-Control', 'public, immutable, max-age=31536000')
        return c.body(webp, 200)
    },
)

export type OgImageApp = typeof ogImageApp
