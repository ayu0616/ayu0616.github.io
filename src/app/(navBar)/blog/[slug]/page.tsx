import { readFileSync } from 'node:fs'

import type { Metadata } from 'next'

import { BlogBreadcrumb } from '@/components/BlogBreadcrumb/BlogBreadcrumb'
import BlogTag from '@/components/BlogTag/BlogTag'
import Markdown, { BLOG_CONTENT_ID } from '@/components/Markdown/Markdown'
import blogPageInfo from '@/constant/blogPageInfo'
import { getMetadata } from '@/util/metadata'

interface Params {
    slug: string
}

export const generateStaticParams = (): Params[] =>
    Object.keys(blogPageInfo).map((slug) => ({ slug }))

export const generateMetadata = ({
    params,
}: {
    params: Params
}): Promise<Metadata> => {
    const { slug } = params
    const { title } = blogPageInfo[slug]
    return Promise.resolve(
        getMetadata({ title, url: `https://ayu0616.github.io/blog/${slug}` }),
    )
}

const getMarkdown = (slug: string) => {
    const { dirname } = blogPageInfo[slug]
    const lines = readFileSync(
        `blog-contents/${dirname}/page.md`,
        'utf-8',
    ).split('\n')
    let yamlFlag = false
    let markdown = ''
    for (const line of lines) {
        if (line === '---') {
            yamlFlag = !yamlFlag
            continue
        }
        if (yamlFlag) {
            continue
        }
        markdown += `${line}\n`
    }
    return markdown
}

export default function Page({ params }: { params: Params }) {
    const { slug } = params
    const { tags, publishedAt, title } = blogPageInfo[slug]
    const markdown = getMarkdown(slug)
    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto max-w-screen-lg space-y-8 rounded-lg border bg-white px-6 pt-8 pb-16">
                <div className="space-y-4">
                    <BlogBreadcrumb slug={slug} title={title} />
                    <div className="space-y-1">
                        <div className="flex gap-2">
                            <span>タグ：</span>
                            <div className="flex flex-1 flex-wrap gap-x-2 gap-y-1">
                                {tags.length >= 1 ? (
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
                        <div>公開日： {publishedAt.format('YYYY-MM-DD')}</div>
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
