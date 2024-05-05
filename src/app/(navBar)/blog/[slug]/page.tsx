import { readFileSync } from 'fs'

import Markdown from '@/components/Markdown/Markdown'
import blogPageInfo from '@/constant/blogPageInfo'

interface Params {
    slug: string
}

export const generateStaticParams = (): Params[] =>
    Object.keys(blogPageInfo).map((slug) => ({ slug }))

const getMarkdown = (slug: string) => {
    const lines = readFileSync(`blog-contents/${slug}/page.md`, 'utf-8').split(
        '\n',
    )
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
    const { tags, publishedAt } = blogPageInfo[slug]
    const markdown = getMarkdown(slug)
    return (
        <div className='mx-auto mt-6 max-w-screen-lg rounded-lg border bg-white p-4'>
            <div>
                <div>タグ： {tags.join(' ')}</div>
                <div>公開日： {publishedAt.format('YYYY-MM-DD')}</div>
            </div>
            <hr className='my-4' />
            <Markdown>{markdown}</Markdown>
        </div>
    )
}
