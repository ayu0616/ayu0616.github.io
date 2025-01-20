import { use } from 'react'
import { data, useLoaderData } from 'react-router'
import { BlogBreadcrumb } from '~/components/BlogBreadcrumb/BlogBreadcrumb'
import BlogTag from '~/components/BlogTag/BlogTag'
import Markdown, { BLOG_CONTENT_ID } from '~/components/Markdown/Markdown'
import { getBlogPageDetail, getBlogPageInfo } from '~/constant/blog-page-info'
import type { Route } from './+types/blog-detail'

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { slug } = params
    return getBlogPageDetail(slug)
}

export const meta = ({ params }: Route.MetaArgs) => {
    const { slug } = params
    const blogPageInfo = use(getBlogPageInfo())
    if (!(slug && slug in blogPageInfo)) {
        throw data('not-found', { status: 404 })
    }
    const { title } = blogPageInfo[slug]
    return [{ title: title }]
}

export default function Page() {
    const { slug, tags, publishedAt, title, markdown, dirname } =
        useLoaderData<typeof loader>()
    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto max-w-screen-lg space-y-8 rounded-lg border bg-white px-6 pt-8 pb-16">
                <div className="space-y-4">
                    <BlogBreadcrumb slug={slug} title={title} />
                    <div className="space-y-1">
                        <div className="flex gap-2">
                            <span>タグ：</span>
                            <div className="flex flex-1 flex-wrap gap-x-2 gap-y-1">
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
                        </div>
                        <div>公開日： {publishedAt}</div>
                    </div>
                </div>
                <hr />
                <Markdown id={BLOG_CONTENT_ID} slug={slug} dirname={dirname}>
                    {markdown}
                </Markdown>
            </div>
        </div>
    )
}
