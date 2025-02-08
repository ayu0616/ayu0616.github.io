import dayjs from 'dayjs'
import { useLoaderData } from 'react-router'
import { getBlogPageInfo } from 'server/api/blog'
import { BlogPageCard } from '~/components/BlogPageCard'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'

export const meta = () => {
    return [
        { title: 'ブログ' },
        {
            name: 'description',
            content: 'ブログ記事一覧を表示します。',
        },
    ]
}

interface PageListItem extends BlogPageInfoItem {}

export const loader = async () => {
    const blogPageInfo = await getBlogPageInfo()
    const pageList: PageListItem[] = Object.keys(blogPageInfo)
        .map((slug) => blogPageInfo[slug])
        .sort((a, b) => {
            const publishedDiff = dayjs(b.publishedAt).diff(
                dayjs(a.publishedAt),
            ) // 日付の降順
            if (publishedDiff !== 0) {
                return publishedDiff
            }
            return b.slug.localeCompare(a.slug) // slugの降順
        })
    return { pageList }
}

export default function Page() {
    const { pageList } = useLoaderData<typeof loader>()
    return (
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {pageList.map((page) => (
                <BlogPageCard
                    key={page.slug}
                    {...page}
                    publishedAt={dayjs(page.publishedAt).format('YYYY-MM-DD')}
                />
            ))}
        </div>
    )
}
