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
    .sort((a, b) => b.publishedAt.diff(a.publishedAt))

export default function Page() {
    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto grid max-w-screen-lg gap-2">
                {pageList.map((page) => (
                    <BlogPageCard key={page.slug} {...page} />
                ))}
            </div>
        </div>
    )
}
