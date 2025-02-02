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
            <div className="rounded-md bg-white p-6 shadow">
                <div className="flex gap-4">
                    <div className="flex-1">
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
                    <div>
                        <img
                            alt="thumbnail"
                            className="h-32 w-32 rounded-md object-cover"
                            loading="lazy"
                            src={'https://placehold.jp/600x600.png'} // TODO: 画像を取得する
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}
