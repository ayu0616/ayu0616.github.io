import type { BlogPageInfoItem } from '@/constant/blogPageInfo'
import Link from 'next/link'
import type { FC } from 'react'
import BlogTag from './BlogTag/BlogTag'

export type BlogPageCardProps = Pick<
    BlogPageInfoItem,
    'title' | 'slug' | 'tags' | 'publishedAt'
>

export const BlogPageCard: FC<BlogPageCardProps> = ({
    title,
    slug,
    tags,
    publishedAt,
}) => {
    return (
        <Link key={slug} href={`/blog/${slug}`}>
            <div className="rounded-md bg-white p-6 shadow">
                <h3 className="mb-2">{title}</h3>
                <div className="space-y-1">
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {tags.length >= 1 ? (
                            tags.map((tag) => <BlogTag key={tag} tag={tag} />)
                        ) : (
                            <span className="text-gray-500">タグ無し</span>
                        )}
                    </div>
                    <div>公開日： {publishedAt.format('YYYY-MM-DD')}</div>
                </div>
            </div>
        </Link>
    )
}
