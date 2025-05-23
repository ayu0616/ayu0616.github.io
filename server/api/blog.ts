import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import fs from 'node:fs/promises'
import { cache } from 'react'
import { data } from 'react-router'
import { z } from 'zod'
import {
    type BlogPageInfoItem,
    blogPageInfoSchema,
} from '../../app/constant/blog-page-info/schema'

const PROD = process.env.NODE_ENV !== 'development' || import.meta.env.PROD

export const getBlogPageInfo = cache(
    async (): Promise<Record<string, BlogPageInfoItem>> => {
        if (PROD) {
            const res = await fetch(
                'https://storage.googleapis.com/hassaku-blog-contents/page-info.json',
            )
            const parsed = blogPageInfoSchema.parse(await res.json())
            const result: Record<string, BlogPageInfoItem> = Object.fromEntries(
                Object.entries(parsed).filter(
                    ([_, value]) => value.published && value.publishedAt,
                ),
            )
            return result
        }
        const str = await fs.readFile('blog-contents/page-info.json', {
            encoding: 'utf-8',
        })
        return blogPageInfoSchema.parse(JSON.parse(str))
    },
)

export const getBlogTagList = cache(async () =>
    Array.from(
        Object.values(await getBlogPageInfo()).reduce((acc, pageInfo) => {
            pageInfo.tags.forEach((tag) => {
                if (!acc.has(tag)) {
                    acc.add(tag)
                }
            })
            return acc
        }, new Set<string>()),
    ),
)

const getMarkdown = async (slug: string) => {
    let markdown = ''
    if (PROD) {
        const res = await fetch(
            `https://storage.googleapis.com/hassaku-blog-contents/${slug}.md`,
        )
        markdown = await res.text()
    } else {
        markdown = await fs.readFile(`blog-contents/${slug}.md`, {
            encoding: 'utf-8',
        })
    }
    const lines: string[] = []
    let isInYaml = false
    for (const line of markdown.split('\n')) {
        if (line.trim() === '---') {
            isInYaml = !isInYaml
            continue
        }
        if (!isInYaml) {
            lines.push(line)
        }
    }
    return lines.join('\n')
}

export const getBlogPageDetail = cache(async (slug: string) => {
    const info = (await getBlogPageInfo())[slug]
    if (!info) {
        throw data('not-found', { status: 404 })
    }
    const markdown = await getMarkdown(slug)
    return { ...info, markdown }
})

export const getBlogThumbnail = cache(async (slug: string) => {
    const info = (await getBlogPageInfo())[slug]
    if (!info) {
        throw data('not-found', { status: 404 })
    }
    return info.thumbnail
})

export const blogApp = new Hono()
    .get('/', async (c) => {
        return c.json(await getBlogPageInfo(), 200)
    })
    .get('/tags', async (c) => {
        return c.json(await getBlogTagList(), 200)
    })
    .get(
        '/:slug',
        zValidator('param', z.object({ slug: z.string().min(1) })),
        async (c) => {
            const { slug } = c.req.valid('param')
            return c.json(await getBlogPageDetail(slug), 200)
        },
    )
    .get(
        '/:slug/headings',
        zValidator('param', z.object({ slug: z.string().min(1) })),
        async (c) => {
            const { slug } = c.req.valid('param')
            return c.json((await getBlogPageDetail(slug)).headings, 200)
        },
    )
