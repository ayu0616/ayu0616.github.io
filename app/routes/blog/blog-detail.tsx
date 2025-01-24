import { atom, useAtomValue } from 'jotai'
import { atomFamily, useHydrateAtoms } from 'jotai/utils'
import { useLoaderData } from 'react-router'
import { getBlogPageDetail } from 'server/api/blog'
import { BlogBreadcrumb } from '~/components/BlogBreadcrumb/BlogBreadcrumb'
import BlogTag from '~/components/BlogTag/BlogTag'
import Markdown, { BLOG_CONTENT_ID } from '~/components/Markdown/Markdown'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import type { Route } from './+types/blog-detail'

const blogDetailAtom = atomFamily((slug: string) =>
    atom<BlogPageInfoItem | null>(null),
)

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { slug } = params
    const res = await getBlogPageDetail(slug)
    return res
}

export const meta = ({ params }: Route.MetaArgs) => {
    const data = useAtomValue(blogDetailAtom(params.slug))
    if (!data) {
        return []
    }
    return [{ title: data.title }]
}

export default function Page({ params }: Route.ComponentProps) {
    const { slug } = params
    const data = useLoaderData<typeof loader>()
    useHydrateAtoms([[blogDetailAtom(slug), data]])
    const { tags, publishedAt, title, markdown } = data
    return (
        <div className="w-full min-w-0">
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
                <Markdown id={BLOG_CONTENT_ID} slug={slug}>
                    {markdown}
                </Markdown>
            </div>
        </div>
    )
}
