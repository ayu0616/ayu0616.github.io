import { atom, useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { getBlogPageDetail } from 'server/api/blog'
import { BlogBreadcrumb } from '~/components/BlogBreadcrumb/BlogBreadcrumb'
import BlogTag from '~/components/BlogTag/BlogTag'
import { JsonLD } from '~/components/JsonLD/JsonLD'
import Markdown, { BLOG_CONTENT_ID } from '~/components/Markdown/Markdown'
import { AtomsHydrator } from '~/components/common/atoms-hydrator'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import { ogImageClient } from '~/lib/hono'
import type { Route } from './+types/blog-detail'

export const blogDetailAtom = atomFamily((slug: string) =>
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
    return [
        { title: data.title },
        {
            property: 'og:title',
            content: data.title,
        },
        {
            property: 'og:image',
            content: ogImageClient['og-image'].$url({
                query: { title: data.title },
            }),
        },
        {
            name: 'twitter:title',
            content: data.title,
        },
        {
            name: 'twitter:image',
            content: ogImageClient['og-image'].$url({
                query: { title: data.title },
            }),
        },
    ]
}

export default function Page({ params, loaderData }: Route.ComponentProps) {
    const { slug } = params
    const { tags, publishedAt, title, markdown } = loaderData
    return (
        <>
            <AtomsHydrator atomValues={[[blogDetailAtom(slug), loaderData]]}>
                <div className="w-full min-w-0">
                    <div className="mx-auto max-w-(--breakpoint-lg) space-y-8 rounded-lg border bg-white px-6 pt-8 pb-16">
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
            </AtomsHydrator>
            <JsonLD
                id="blog-post-jsonld"
                json={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: title,
                    datePublished: publishedAt ?? undefined,
                    dateModified: publishedAt ?? undefined,
                    author: {
                        '@type': 'Person',
                        name: 'はっさくゼリー製造工場',
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'はっさくゼリー製造工場',
                        logo: {
                            '@type': 'ImageObject',
                            url: 'https://www.hassaku0616.com/icon.webp',
                        },
                    },
                    image: ogImageClient['og-image']
                        .$url({
                            query: { title: title },
                        })
                        .toString(),
                    url: `https://www.hassaku0616.com/blog/${slug}`,
                    mainEntityOfPage: `https://www.hassaku0616.com/blog/${slug}`,
                }}
            />
        </>
    )
}
