import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import * as yaml from 'js-yaml'
import { z } from 'zod'

interface DirInfo {
    dirname: string
    slug: string
}

interface BlogHeading {
    level: number
    title: string
}

export interface BlogPageInfoItem {
    created: Dayjs
    dirname: string
    headings: BlogHeading[]
    modified: Dayjs
    slug: string
    tags: string[]
    title: string
    published: boolean
    publishedAt: Dayjs
}

const yamlSchema = z
    .object({
        created: z.date().transform(dayjs),
        modified: z.date().transform(dayjs),
        tags: z
            .array(z.string())
            .nullable()
            .transform((tags) => tags || []),
        published: z.boolean(),
        publishedAt: z
            .date()
            .nullable()
            .transform((val) => (val ? dayjs(val) : dayjs(0))),
    })
    .superRefine((val, ctx) => {
        if (val.published && val.publishedAt === null) {
            ctx.addIssue({
                code: 'custom',
                message: 'publishedAt is required when published is true',
                path: ['publishedAt'],
            })
        }
    })

const IGNORE_SLUGS = new Set<string>([
    'template',
    // "test",
])

function isTarget(slug: string): boolean {
    return !IGNORE_SLUGS.has(slug)
}

const basedir =
    process.env.NODE_ENV === 'production'
        ? '/app/blog-contents'
        : path.join(process.cwd(), 'blog-contents')

function getDirInfo(): DirInfo[] {
    const res = fs.globSync(path.join(basedir, '**/page.md'))
    const dirInfo: DirInfo[] = []
    for (const filePath of res) {
        const dirname = path.dirname(filePath)
        const slug = path.basename(dirname)
        if (!isTarget(slug)) {
            continue
        }
        dirInfo.push({ dirname, slug })
    }
    return dirInfo
}

function getPageInfoItem(dirInfo: DirInfo): BlogPageInfoItem {
    const { dirname, slug } = dirInfo
    const filePath = path.join(dirname, 'page.md')
    const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/)
    let yamlFlag = false
    const yamlLines: string[] = []

    for (const line of lines) {
        if (line === '---' && !yamlFlag) {
            yamlFlag = true
            continue
        }
        if (line === '---' && yamlFlag) {
            yamlFlag = false
            break
        }
        if (yamlFlag) {
            yamlLines.push(line)
        }
    }

    const yml = yamlSchema.parse(yaml.load(yamlLines.join('\n')))
    const pageInfoItem: BlogPageInfoItem = {
        created: yml.created,
        dirname,
        headings: [],
        modified: yml.modified,
        slug,
        tags: yml.tags || [],
        title: '',
        published: yml.published,
        publishedAt: yml.publishedAt,
    }
    const headings: BlogHeading[] = []
    const headingReg = /^(##+) (.*)$/ // min level is 2
    for (const line of lines) {
        if (line.startsWith('# ')) {
            pageInfoItem.title = line.slice(2)
            continue
        }
        const match = line.match(headingReg)
        if (match) {
            headings.push({
                level: match[1].length,
                title: match[2],
            })
        }
    }
    pageInfoItem.headings = headings

    // 必要に応じてdicやheadingsを使用します
    return pageInfoItem
}

const dirInfoList = getDirInfo()

export const getBlogPageInfo = (): Record<string, BlogPageInfoItem> => {
    const dirInfoList = getDirInfo()
    return dirInfoList.map(getPageInfoItem).reduce(
        (acc, cur) => {
            if (process.env.NODE_ENV === 'production' && !cur.published) {
                // 本番環境ではpublishedでないものは無視
                return acc
            }
            acc[cur.slug] = cur
            return acc
        },
        {} as Record<string, BlogPageInfoItem>,
    )
}

export const blogPageInfo = dirInfoList.map(getPageInfoItem).reduce(
    (acc, cur) => {
        if (process.env.NODE_ENV === 'production' && !cur.published) {
            // 本番環境ではpublishedでないものは無視
            return acc
        }
        acc[cur.slug] = cur
        return acc
    },
    {} as Record<string, BlogPageInfoItem>,
)

export const blogTagList = Array.from(
    Object.values(blogPageInfo).reduce((acc, pageInfo) => {
        pageInfo.tags.forEach((tag) => {
            if (!acc.has(tag)) {
                acc.add(tag)
            }
        })
        return acc
    }, new Set<string>()),
)
