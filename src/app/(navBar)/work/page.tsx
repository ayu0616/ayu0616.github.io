import { Metadata } from 'next'
import Link from 'next/link'

import { generateTitle } from '@/util/metadata'

import { works } from '../../../constant/works'

export const metadata: Metadata = {
    title: generateTitle('作品一覧'),
}

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
