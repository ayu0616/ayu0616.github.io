import dayjs from 'dayjs'
import { getBlogPageInfo } from 'server/api/blog'
import { BlogPageCard } from '~/components/BlogPageCard'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import type { Route } from './+types/blog'
import { SearchForm } from './components/search-form'

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
            <SearchForm searchQuery={searchQuery} />

            {searchQuery && (
                <div className="space-y-4">
                    <h2 className="font-semibold text-xl">
                        「{searchQuery}」の検索結果
                        <span className="ml-2 text-gray-500 text-sm">
                            ({pageList.length}件)
                        </span>
                    </h2>
                    {pageList.length === 0 && (
                        <p className="text-gray-500">
                            該当する記事が見つかりませんでした
                        </p>
                    )}
                </div>
            )}

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
