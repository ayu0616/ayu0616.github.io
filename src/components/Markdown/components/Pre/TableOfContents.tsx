import { ReactNode, useMemo } from 'react'

import blogPageInfo from '@/constant/blogPageInfo'

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
    const toc = useMemo(() => {
        if (!slug || !(slug in blogPageInfo)) return ''
        const pageInfo = blogPageInfo[slug]
        const headings = pageInfo.headings
        const tocList: string[] = []
        headings.forEach((heading) => {
            const { level, title } = heading
            tocList.push(
                `${' '.repeat((level - 2) * 4)}- [${title}](#${title})`,
            )
        })
        return tocList.join('\n')
    }, [slug])
    return (
        <div className='mx-auto w-fit space-y-4 rounded-md border border-emerald-800'>
            <div className='rounded-t-md bg-emerald-800 p-2 text-center text-lg text-white'>
                Contents
            </div>
            <Markdown className='p-4 pt-0' id='toc'>
                {toc || '目次なし'}
            </Markdown>
        </div>
    )
}

export default TableOfContents
