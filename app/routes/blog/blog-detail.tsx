import { atom, useAtomValue } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useLoaderData } from 'react-router'
import { BlogBreadcrumb } from '~/components/BlogBreadcrumb/BlogBreadcrumb'
import BlogTag from '~/components/BlogTag/BlogTag'
import Markdown, { BLOG_CONTENT_ID } from '~/components/Markdown/Markdown'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import { honoClient } from '~/lib/hono'
import type { Route } from './+types/blog-detail'

const blogDetailAtom = atom<BlogPageInfoItem | null>(null)

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { slug } = params
    const res = honoClient.blog[':slug'].$get({ param: { slug } })
    return (await res).json()
}

export const meta = ({ params }: Route.MetaArgs) => {
    const data = useAtomValue(blogDetailAtom)
    if (!data) {
        return []
    }
    return [{ title: data.title }]
}

export default function Page() {
    const data = useLoaderData<typeof loader>()
    useHydrateAtoms([[blogDetailAtom, data]])
    const { slug, tags, publishedAt, title, markdown, dirname } = data
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
