import dayjs, { type Dayjs } from 'dayjs'

import _pageInfoBefore from '@/../blog-contents/page-info.json'

type BlogPageInfoItemBefore = {
    created: string
    dirname: string
    headings: {
        level: number
        title: string
    }[]
    modified: string
    slug: string
    tags: string[] | null
    title: string
} & ({ published: true; publishedAt: string } | { published: false })

interface BlogPageInfoItemChangeTarget {
    created: Dayjs
    modified: Dayjs
    publishedAt: Dayjs
    tags: string[]
}

export type BlogPageInfoItem = Omit<
    BlogPageInfoItemBefore,
    keyof BlogPageInfoItemChangeTarget
> &
    BlogPageInfoItemChangeTarget

const convertPageInfo = (
    pageInfoItem: BlogPageInfoItemBefore,
): BlogPageInfoItem => {
    return {
        ...pageInfoItem,
        created: dayjs(pageInfoItem.created),
        modified: dayjs(pageInfoItem.modified),
        publishedAt: pageInfoItem.published
            ? dayjs(pageInfoItem.publishedAt)
            : dayjs(0),
        tags: pageInfoItem.tags || [],
    }
}

const pageInfoBefore = _pageInfoBefore as Record<string, BlogPageInfoItemBefore>
const blogPageInfo = Object.keys(pageInfoBefore).reduce(
    (acc, key) => {
        if (
            process.env.NODE_ENV === 'production' &&
            !pageInfoBefore[key].published
        ) {
            return acc
        }
        acc[key] = convertPageInfo(pageInfoBefore[key])
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

export default blogPageInfo
