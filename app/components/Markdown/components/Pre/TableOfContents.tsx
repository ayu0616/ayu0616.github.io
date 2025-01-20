import { type ReactNode, use, useMemo } from 'react'

import { getBlogPageInfo } from '~/constant/blog-page-info'
import Markdown from '../../Markdown'

export interface TableOfContentsProps {
    children?: ReactNode
    slug?: string
}

const TableOfContents = ({
    children,
    slug,
    ...props
}: TableOfContentsProps) => {
    const blogPageInfo = use(getBlogPageInfo())
    const toc = useMemo(() => {
        if (!(slug && slug in blogPageInfo)) {
            return ''
        }
        const pageInfo = blogPageInfo[slug]
        const headings = pageInfo.headings
        const tocList: string[] = []
        headings.forEach((heading) => {
            const { level, title } = heading
            const encodedTitle = encodeURIComponent(title) // エンコードしないとリンクとして判定されない場合がある
            tocList.push(
                `${' '.repeat((level - 2) * 4)}- [${title}](#${encodedTitle})`,
            )
        })
        return tocList.join('\n')
    }, [slug, blogPageInfo])
    return (
        <div className="mx-auto w-fit min-w-[50%] max-w-full rounded-md border border-emerald-800">
            <div className="rounded-t-md bg-emerald-800 p-2 text-center text-lg text-white">
                Contents
            </div>
            <Markdown className="p-6" id="toc">
                {toc || '目次なし'}
            </Markdown>
        </div>
    )
}

export default TableOfContents
