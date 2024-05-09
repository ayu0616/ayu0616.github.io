import { Metadata } from 'next'
import Link from 'next/link'

import BlogTag from '@/components/BlogTag/BlogTag'
import blogPageInfo, { BlogPageInfoItem } from '@/constant/blogPageInfo'
import { generateTitle } from '@/util/metadata'

export const metadata: Metadata = {
    title: generateTitle('ブログ'),
}

interface PageListItem extends BlogPageInfoItem {
    slug: string
}

const pageList: PageListItem[] = Object.keys(blogPageInfo)
    .map((slug) => ({
        slug,
        ...blogPageInfo[slug],
    }))
    .sort((a, b) => b.publishedAt.diff(a.publishedAt))

export default function Page() {
    return (
        <div className='p-4 md:p-6'>
            <div className='mx-auto grid max-w-screen-lg gap-2'>
                {pageList.map((page) => (
                    <Link key={page.slug} href={`/blog/${page.slug}`}>
                        <div className='rounded-md bg-white p-4 shadow'>
                            <h3>{page.title}</h3>
                            <div className='flex items-center gap-2'>
                                <span>タグ：</span>
                                {page.tags.length >= 1 ? (
                                    page.tags.map((tag) => (
                                        <BlogTag key={tag} tag={tag}></BlogTag>
                                    ))
                                ) : (
                                    <span className='text-gray-500'>
                                        タグ無し
                                    </span>
                                )}
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
