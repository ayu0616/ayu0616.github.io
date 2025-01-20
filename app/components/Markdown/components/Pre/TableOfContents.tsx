import { type ReactNode, cache, useMemo } from 'react'

import { honoClient } from '~/lib/hono'
import Markdown from '../../Markdown'

import { useQuery } from '@tanstack/react-query'
import { Loading } from '~/components/common/loading'

export interface TableOfContentsProps {
    children?: ReactNode
    slug?: string
}

const getHeadings = cache(async (slug: string) => {
    const res = await honoClient.blog[':slug'].$get({ param: { slug } })
    return (await res.json()).headings
})

const TableOfContents = ({
    children,
    slug,
    ...props
}: TableOfContentsProps) => {
    const { data: headings, isPending } = useQuery({
        queryKey: ['blog', slug],
        queryFn: () => (slug ? getHeadings(slug) : null),
    })
    const toc = useMemo(() => {
        if (!headings) {
            return ''
        }
        const tocList: string[] = []
        headings.forEach((heading) => {
            const { level, title } = heading
            const encodedTitle = encodeURIComponent(title) // エンコードしないとリンクとして判定されない場合がある
            tocList.push(
                `${' '.repeat((level - 2) * 4)}- [${title}](#${encodedTitle})`,
            )
        })
        return tocList.join('\n')
    }, [headings])
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
                <Markdown className="p-6" id="toc">
                    {toc || '目次なし'}
                </Markdown>
            )}
        </div>
    )
}

export default TableOfContents
