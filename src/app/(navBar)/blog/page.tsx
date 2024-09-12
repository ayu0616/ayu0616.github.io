import { BlogPageCard } from '@/components/BlogPageCard'
import blogPageInfo, { type BlogPageInfoItem } from '@/constant/blogPageInfo'
import { getMetadata } from '@/util/metadata'

export const metadata = getMetadata({
    title: 'ブログ',
    url: 'https://ayu0616.github.io/blog',
})

interface PageListItem extends BlogPageInfoItem {}

const pageList: PageListItem[] = Object.keys(blogPageInfo)
    .map((slug) => blogPageInfo[slug])
    .sort((a, b) => {
        const publishedDiff = b.publishedAt.diff(a.publishedAt) // 日付の降順
        if (publishedDiff !== 0) {
            return publishedDiff
        }
        return b.slug.localeCompare(a.slug) // slugの降順
    })

export default function Page() {
    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto grid max-w-screen-lg gap-4">
                {pageList.map((page) => (
                    <BlogPageCard key={page.slug} {...page} />
                ))}
            </div>
        </div>
    )
}
