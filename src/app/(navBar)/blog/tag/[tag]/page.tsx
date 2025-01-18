import { BlogPageCard } from '@/components/BlogPageCard'
import { type BlogPageInfoItem, blogPageInfo } from '@/constant/blog-page-info'
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

export const generateMetadata = async ({
    params,
}: {
    params: Promise<Params>
}): Promise<Metadata> => {
    const { tag } = await params
    const decodedTag = decodeURI(tag)
    return Promise.resolve(
        getMetadata({
            title: `タグ： ${decodedTag}`,
            url: `https://ayu0616.github.io/blog/tag/${tag}`,
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

export default async function Page({ params }: { params: Promise<Params> }) {
    const { tag } = await params
    const decodedTag = decodeURI(tag)
    const pageList = getPageListByTag(decodedTag)

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
                <h1 className="mb-8">タグ：{decodedTag}</h1>
                <div className="grid gap-4">
                    {pageList.map((page) => (
                        <BlogPageCard key={page.slug} {...page} />
                    ))}
                </div>
            </div>
        </div>
    )
}
