import dayjs from 'dayjs'
import { Link, useLoaderData } from 'react-router'
import { BlogPageCard } from '~/components/BlogPageCard'
import { getBlogPageInfo } from '~/constant/blog-page-info'
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
        <div className="gap-8 p-4 md:flex md:p-6">
            <div className="mx-auto grid max-w-screen-sm gap-4">
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
            <div className="sticky top-[120px] hidden h-fit bg-white p-4 md:block">
                <h2 className="mb-2 text-lg">新着記事</h2>
                <ul>
                    {pageList.slice(0, 5).map(({ slug, title }) => (
                        <li className="flex" key={slug}>
                            <Link
                                className="underline-offset-2 hover:underline"
                                to={`/blog/${slug}`}
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
