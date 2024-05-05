'use client'

import { ReactNode, useEffect, useState } from 'react'

import Markdown, { BLOG_CONTENT_ID } from '../../Markdown'

export interface TableOfContentsProps {
    children?: ReactNode
}

const headingNumList = [2, 3, 4, 5, 6] as const

const TableOfContents = ({ children, ...props }: TableOfContentsProps) => {
    const [toc, setToc] = useState<string>('')
    useEffect(() => {
        const mdElem = document.getElementById(BLOG_CONTENT_ID)
        if (!mdElem) return
        const headings = Array.from(
            mdElem.querySelectorAll(
                headingNumList.map((n) => `h${n}`).join(', '),
            ),
        )
        const tocList: string[] = []
        headings.forEach((heading) => {
            const level = parseInt(heading.tagName[1])
            const title = heading.textContent ?? ''
            heading.id = title
            tocList.push(
                `${' '.repeat((level - 2) * 4)}- [${title}](#${heading.id})`,
            )
        })
        setToc(tocList.join('\n'))
        console.log(tocList)
    }, [])
    return <Markdown id='toc'>{toc}</Markdown>
}

export default TableOfContents
