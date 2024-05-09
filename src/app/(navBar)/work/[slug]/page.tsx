import { Metadata } from 'next'

import { isWorkKey, works } from '@/constant/works'
import { generateTitle } from '@/util/metadata'

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
    return Promise.resolve({
        title: generateTitle(title),
    })
}

export default function Page({ params }: { params: Param }) {
    const { slug } = params
    if (!isWorkKey(slug)) {
        return <div>not found</div>
    }

    return (
        <div className='flex h-full flex-col items-center justify-center gap-4'>
            <h1>{works[slug].content}</h1>
            <p>準備中</p>
        </div>
    )
}
