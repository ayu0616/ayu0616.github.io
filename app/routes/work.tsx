import { works } from 'app/constant/works'
import { Link } from 'react-router'

export const meta = () => {
    return [{ title: '作品一覧' }]
}

export default function Page() {
    return (
        <div>
            {(Object.keys(works) as (keyof typeof works)[]).map((slug) => {
                const { title } = works[slug]
                return (
                    <Link key={slug} to={`/work/${slug}`}>
                        {title}
                    </Link>
                )
            })}
        </div>
    )
}
