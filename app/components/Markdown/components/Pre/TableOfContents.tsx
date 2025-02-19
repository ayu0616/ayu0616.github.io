import { useAtomValue } from 'jotai'
import type { ReactNode } from 'react'
import { blogDetailAtom } from '~/routes/blog/blog-detail'
import { Anchor } from '../a'
import { Li } from '../list'

export interface TableOfContentsProps {
    children?: ReactNode
    slug?: string
}

interface Heading {
    level: number
    title: string
    children: Heading[]
}

function createHeadingList(
    rawHeadings: { level: number; title: string }[],
): Heading[] {
    const root: Heading = { level: 1, title: 'root', children: [] }
    let currentParent = root
    const stack = [root]
    rawHeadings.forEach((heading) => {
        while (stack.length > 1 && heading.level <= currentParent.level) {
            stack.pop()
            currentParent = stack[stack.length - 1]
        }
        const newItem = { ...heading, children: [] }
        currentParent.children.push(newItem)
        stack.push(newItem)
        currentParent = newItem
    })
    return root.children
}

const TableOfContents = ({
    children,
    slug,
    ...props
}: TableOfContentsProps) => {
    const rawHeadings = useAtomValue(blogDetailAtom(slug ?? ''))?.headings ?? []
    const headings = createHeadingList(rawHeadings)

    return (
        <div className="mx-auto w-fit min-w-[min(100%,384px)] max-w-full rounded-md border border-emerald-800">
            <div className="rounded-t-md bg-emerald-800 p-2 text-center text-lg text-white">
                Contents
            </div>
            <div className="p-6">
                <HeadingList headings={headings} />
            </div>
        </div>
    )
}

const HeadingList = ({ headings }: { headings: Heading[] }) => {
    return (
        <ul>
            {headings.map((heading) => (
                <Li key={heading.title}>
                    <p>
                        <Anchor href={`#${encodeURIComponent(heading.title)}`}>
                            {heading.title}
                        </Anchor>
                    </p>
                    {heading.children.length > 0 && (
                        <HeadingList headings={heading.children} />
                    )}
                </Li>
            ))}
        </ul>
    )
}

export default TableOfContents
