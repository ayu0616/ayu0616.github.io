import dayjs from 'dayjs'
import type { FC } from 'react'
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
        <div className="w-full justify-between gap-8 p-6 pb-10 md:flex md:p-8 md:pb-16">
            <div className="mx-auto grid min-w-[50%] max-w-screen-sm flex-1 gap-4">
                <Outlet />
            </div>
            <div className="md:hidden">
                <MobileMenu pageList={pageList} />
            </div>
            <div className="hidden md:block">
                <DesktopMenu pageList={pageList} />
            </div>
        </div>
    )
}

const MobileMenu: FC<{ pageList: BlogPageInfoItem[] }> = ({ pageList }) => {
    return (
        <div className="mx-auto mt-12 h-fit max-w-screen-sm rounded-md border bg-white p-4">
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
    )
}

const DesktopMenu: FC<{ pageList: BlogPageInfoItem[] }> = ({ pageList }) => {
    return (
        <div className="sticky top-[120px] hidden h-fit rounded-md border bg-white p-4 md:block">
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
    )
}
