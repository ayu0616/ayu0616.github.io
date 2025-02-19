import dayjs from 'dayjs'
import { Form } from 'react-router'
import { getBlogPageInfo } from 'server/api/blog'
import { BlogPageCard } from '~/components/BlogPageCard'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import type { Route } from './+types/blog'

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

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get('q') || ''

    const blogPageInfo = await getBlogPageInfo()
    const pageList: PageListItem[] = Object.keys(blogPageInfo)
        .map((slug) => blogPageInfo[slug])
        .filter((page) => {
            const normalizedQuery = searchQuery.toLowerCase()
            return page.title.toLowerCase().includes(normalizedQuery)
        })
        .sort((a, b) => {
            const publishedDiff = dayjs(b.publishedAt).diff(
                dayjs(a.publishedAt),
            ) // 日付の降順
            if (publishedDiff !== 0) {
                return publishedDiff
            }
            return b.slug.localeCompare(a.slug) // slugの降順
        })
    return { pageList, searchQuery }
}

export default function Page({
    loaderData: { pageList, searchQuery },
}: Route.ComponentProps) {
    return (
        <div className="space-y-8">
            <Form className="mb-8 max-w-md">
                <input
                    type="search"
                    name="q"
                    placeholder="記事を検索..."
                    className="w-full rounded-lg border bg-white px-4 py-2"
                    defaultValue={searchQuery}
                />
            </Form>
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {pageList.map((page) => (
                    <BlogPageCard
                        key={page.slug}
                        {...page}
                        publishedAt={dayjs(page.publishedAt).format(
                            'YYYY-MM-DD',
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
