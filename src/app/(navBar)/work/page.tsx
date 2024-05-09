import Link from 'next/link'

import { getMetadata } from '@/util/metadata'

import { works } from '../../../constant/works'

export const metadata = getMetadata({
    title: '作品一覧',
    url: 'https://ayu0616.github.io/work',
})

export default function Page() {
    return (
        <div>
            {(Object.keys(works) as (keyof typeof works)[]).map((slug) => {
                const { title } = works[slug]
                return (
                    <Link key={slug} href={`/work/${slug}`}>
                        {title}
                    </Link>
                )
            })}
        </div>
    )
}
