import { Metadata } from 'next'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

import BlogTag from '@/components/BlogTag/BlogTag'
import blogPageInfo, { BlogPageInfoItem } from '@/constant/blogPageInfo'
import { getMetadata } from '@/util/metadata'

interface Params {
    tag: string
}

const allTags = Object.values(blogPageInfo).flatMap((info) => info.tags)
const uniqueTags = Array.from(new Set(allTags))

export const generateStaticParams = (): Params[] => {
    return uniqueTags.map((tag) => ({ tag }))
}

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
        .map((slug) => ({
            slug,
            ...blogPageInfo[slug],
        }))
        .filter((page) => page.tags.includes(tag))
        .sort((a, b) => b.publishedAt.diff(a.publishedAt))
}

export default function Page({ params }: { params: Params }) {
    const tag = decodeURI(params.tag)
    const pageList = getPageListByTag(tag)

    // TODO: [slug]/page.tsxと共通化
    return (
        <div className='p-4 md:p-6'>
            <div className='mx-auto grid max-w-screen-lg gap-2'>
                <Link href='/blog'>
                    <div className='flex items-center gap-2 text-emerald-800 underline-offset-2 hover:underline'>
                        <FaArrowLeft />
                        <span>ブログ一覧に戻る</span>
                    </div>
                </Link>
                <h1>タグ：{tag}</h1>
                {pageList.map((page) => (
                    <Link key={page.slug} href={`/blog/${page.slug}`}>
                        <div className='rounded-md bg-white p-4 shadow'>
                            <h3>{page.title}</h3>
                            <div className='flex items-center gap-2'>
                                <span>タグ：</span>
                                {page.tags.map((tag) => (
                                    <BlogTag key={tag} tag={tag}></BlogTag>
                                ))}
                            </div>
                            <div>
                                公開日： {page.publishedAt.format('YYYY-MM-DD')}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
