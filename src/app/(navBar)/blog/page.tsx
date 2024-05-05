import Link from 'next/link'

import blogPageInfo, { BlogPageInfoItem } from '@/constant/blogPageInfo'

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
        <div className='mx-auto mt-8 grid max-w-screen-lg'>
            {pageList.map((page) => (
                <Link key={page.slug} href={`/blog/${page.slug}`}>
                    <div className='rounded-md bg-white p-4 shadow'>
                        <h3>{page.title}</h3>
                        <div>タグ： {page.tags.join(' ')}</div>
                        <div>
                            公開日： {page.publishedAt.format('YYYY-MM-DD')}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
