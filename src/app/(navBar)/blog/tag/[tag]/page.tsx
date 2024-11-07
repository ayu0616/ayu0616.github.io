import { BlogPageCard } from '@/components/BlogPageCard'
import blogPageInfo, { type BlogPageInfoItem } from '@/constant/blogPageInfo'
import { getMetadata } from '@/util/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

interface Params {
    tag: string
}

const allTags = Object.values(blogPageInfo).flatMap((info) => info.tags)
const uniqueTags = Array.from(new Set(allTags))

// export const generateStaticParams = (): Params[] => {
//     return uniqueTags.map((tag) => ({ tag }))
// }

export const generateMetadata = ({
    params,
}: {
    params: Params
}): Promise<Metadata> => {
    const tag = decodeURI(params.tag)
    return Promise.resolve(
        getMetadata({
            title: `タグ： ${tag}`,
            url: `https://ayu0616.github.io/blog/tag/${params.tag}`,
        }),
    )
}

interface PageListItem extends BlogPageInfoItem {
    slug: string
}

const getPageListByTag = (tag: string): PageListItem[] => {
    return Object.keys(blogPageInfo)
        .map((slug) => blogPageInfo[slug])
        .filter((page) => page.tags.includes(tag))
        .sort((a, b) => b.publishedAt.diff(a.publishedAt))
}

export default function Page({ params }: { params: Params }) {
    const tag = decodeURI(params.tag)
    const pageList = getPageListByTag(tag)

    // TODO: [slug]/page.tsxと共通化
    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto max-w-screen-lg">
                <Link href="/blog">
                    <div className="mb-8 flex items-center gap-2 text-emerald-800 underline-offset-2 hover:underline">
                        <FaArrowLeft />
                        <span>ブログ一覧に戻る</span>
                    </div>
                </Link>
                <h1 className="mb-8">タグ：{tag}</h1>
                <div className="grid gap-4">
                    {pageList.map((page) => (
                        <BlogPageCard key={page.slug} {...page} />
                    ))}
                </div>
            </div>
        </div>
    )
}
