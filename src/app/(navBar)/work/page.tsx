import Link from 'next/link'

import { works } from '../../../constant/works'

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
