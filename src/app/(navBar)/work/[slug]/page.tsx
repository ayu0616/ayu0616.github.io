import type { Metadata } from 'next'

import { isWorkKey, works } from '@/constant/works'
import { getMetadata } from '@/util/metadata'

interface Param {
    slug: string
}

export const generateStaticParams = (): Param[] =>
    Object.keys(works).map((slug) => ({ slug }))

export const generateMetadata = ({
    params,
}: {
    params: Param
}): Promise<Metadata> => {
    const { slug } = params
    if (!isWorkKey(slug)) {
        return Promise.reject('404')
    }
    const { title } = works[slug]
    return Promise.resolve(
        getMetadata({ title, url: `https://ayu0616.github.io/work/${slug}` }),
    )
}

export default function Page({ params }: { params: Param }) {
    const { slug } = params
    if (!isWorkKey(slug)) {
        return <div>not found</div>
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1>{works[slug].content}</h1>
            <p>準備中</p>
        </div>
    )
}
