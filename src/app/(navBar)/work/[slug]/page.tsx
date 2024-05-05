import { isWorkKey, works } from '@/constant/works'

interface Param {
    slug: string
}

export const generateStaticParams = (): Param[] =>
    Object.keys(works).map((slug) => ({ slug }))

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
