import { BlogPageCard } from '@/components/BlogPageCard'
import {
    type BlogPageInfoItem,
    getBlogPageInfo,
} from '@/constant/blog-page-info'
import { getMetadata } from '@/util/metadata'

export const dynamic = 'force-dynamic'
export const revalidate = 3600
import Link from 'next/link'

export const metadata = getMetadata({
    title: 'ブログ',
    url: 'https://ayu0616.github.io/blog',
})

interface PageListItem extends BlogPageInfoItem {}

export default function Page() {
    const blogPageInfo = getBlogPageInfo()
    const pageList: PageListItem[] = Object.keys(blogPageInfo)
        .map((slug) => blogPageInfo[slug])
        .sort((a, b) => {
            const publishedDiff = b.publishedAt.diff(a.publishedAt) // 日付の降順
            if (publishedDiff !== 0) {
                return publishedDiff
            }
            return b.slug.localeCompare(a.slug) // slugの降順
        })
    return (
        <div className="gap-8 p-4 md:flex md:p-6">
            <div className="mx-auto grid max-w-screen-sm gap-4">
                {pageList.map((page) => (
                    <BlogPageCard key={page.slug} {...page} />
                ))}
            </div>
            <div className="sticky top-[120px] hidden h-fit bg-white p-4 md:block">
                <h2 className="mb-2 text-lg">新着記事</h2>
                <ul>
                    {pageList.slice(0, 5).map(({ slug, title }) => (
                        <li className="flex" key={slug}>
                            <Link
                                className="underline-offset-2 hover:underline"
                                href={`/blog/${slug}`}
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
