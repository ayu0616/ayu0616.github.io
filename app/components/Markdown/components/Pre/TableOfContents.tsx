import { type ReactNode, cache } from 'react'

import { honoClient } from 'app/lib/hono'

import { useQuery } from '@tanstack/react-query'
import { Loading } from 'app/components/common/loading'
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

const getHeadings = cache(async (slug: string): Promise<Heading[]> => {
    const res = await honoClient.blog[':slug'].headings.$get({
        param: { slug },
    })
    const rawHeadings = await res.json()

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
})

const TableOfContents = ({
    children,
    slug,
    ...props
}: TableOfContentsProps) => {
    const { data: headings, isPending } = useQuery({
        queryKey: ['blog', slug],
        queryFn: () => (slug ? getHeadings(slug) : null),
        staleTime: 1000 * 60 * 60 * 24,
    })
    return (
        <div className="mx-auto w-fit min-w-[50%] max-w-full rounded-md border border-emerald-800">
            <div className="rounded-t-md bg-emerald-800 p-2 text-center text-lg text-white">
                Contents
            </div>
            {isPending ? (
                <div className="p-6">
                    <Loading />
                </div>
            ) : (
                <div className="p-6">
                    <HeadingList headings={headings ?? []} />
                </div>
            )}
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
