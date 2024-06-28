import { Metadata } from 'next'
import Image from 'next-export-optimize-images/picture'
import { redirect } from 'next/navigation'

import skillData from '@/constant/skillData'
import { getMetadata } from '@/util/metadata'

export const generateStaticParams = () => skillData.map(({ id }) => ({ id }))

export const generateMetadata = ({
    params,
}: {
    params: { id: string }
}): Promise<Metadata> => {
    const { id } = params
    const skill = skillData.find((s) => s.id === id)
    if (!skill) {
        return Promise.reject('404')
    }
    return Promise.resolve(
        getMetadata({
            title: skill.skillName,
            url: `https://ayu0616.github.io/skill/${id}`,
        }),
    )
}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params
    const skill = skillData.find((s) => s.id === id)
    if (!skill) {
        return redirect('/404')
    }
    return (
        <div className='flex h-full w-dvw flex-col items-center justify-center gap-6'>
            <h1 className='text-3xl font-bold' style={{ color: skill.color }}>
                {skill.skillName}
            </h1>
            <p>準備中</p>
            <div className='flex aspect-square h-16 w-16 items-center justify-center'>
                <Image
                    alt='logo'
                    className='drag-none max-h-full max-w-full'
                    height={0}
                    src={skill.logo}
                    width={0}
                />
            </div>
        </div>
    )
}
