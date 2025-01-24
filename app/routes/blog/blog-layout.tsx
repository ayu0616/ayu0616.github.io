import dayjs from 'dayjs'
import { Outlet } from 'react-router'
import { Link, useLoaderData } from 'react-router'
import { getBlogPageInfo } from 'server/api/blog'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'

export const loader = async () => {
    const blogPageInfo = await getBlogPageInfo()
    const pageList: BlogPageInfoItem[] = Object.keys(blogPageInfo)
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

export default function Layout() {
    const { pageList } = useLoaderData<typeof loader>()
    return (
        <div className="gap-8 p-4 md:flex md:p-6">
            <div className="flex-1">
                <div className="mx-auto grid max-w-screen-sm gap-4">
                    <Outlet />
                </div>
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
