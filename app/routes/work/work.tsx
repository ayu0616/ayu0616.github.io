import { Link } from 'react-router'
import { works } from '~/constant/works'

export const meta = () => {
    return [{ title: '作品一覧' }]
}

export default function Page() {
    return (
        <div className="mx-auto max-w-(--breakpoint-sm) px-4 py-8">
            <div className="rounded border bg-white p-4">
                <ul>
                    {(Object.keys(works) as (keyof typeof works)[]).map(
                        (slug) => {
                            const { title } = works[slug]
                            return (
                                <li key={slug}>
                                    <Link to={`/work/${slug}`}>{title}</Link>
                                </li>
                            )
                        },
                    )}
                </ul>
            </div>
        </div>
    )
}
