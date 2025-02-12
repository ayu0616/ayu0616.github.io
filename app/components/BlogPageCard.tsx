import dayjs from 'dayjs'
import type { FC } from 'react'
import { Link } from 'react-router'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import BlogTag from './BlogTag/BlogTag'

export interface BlogPageCardProps
    extends Pick<BlogPageInfoItem, 'title' | 'slug' | 'tags' | 'publishedAt'> {
    publishedAt: string
}

export const BlogPageCard: FC<BlogPageCardProps> = ({
    title,
    slug,
    tags,
    publishedAt,
}) => {
    return (
        <Link key={slug} to={`/blog/${slug}`}>
            <div className="h-full overflow-hidden rounded-md bg-white shadow-sm">
                <div className="flex h-full flex-col">
                    <div>
                        <img
                            alt="thumbnail"
                            className="aspect-3/2 w-full object-cover"
                            loading="lazy"
                            src={`/blog-image/${slug}/thumbnail`}
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                        <h3 className="mb-2">{title}</h3>
                        <div className="space-y-1">
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <BlogTag key={tag} tag={tag} />
                                    ))
                                ) : (
                                    <span className="text-gray-500">
                                        タグ無し
                                    </span>
                                )}
                            </div>
                            <div>
                                公開日：{' '}
                                {dayjs(publishedAt).format('YYYY-MM-DD')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
