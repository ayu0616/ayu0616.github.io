import dayjs, { Dayjs } from 'dayjs'

import _pageInfoBefore from '@/../blog-contents/page-info.json'

interface BlogPageInfoItemBefore {
    created: string
    headings: {
        level: number
        title: string
    }[]
    modified: string
    published: boolean
    publishedAt: string
    tags: string[] | null
    title: string
}

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
        publishedAt: dayjs(pageInfoItem.publishedAt),
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

export default blogPageInfo
