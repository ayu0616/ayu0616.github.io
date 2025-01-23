import { isWorkKey, works } from 'app/constant/works'
import { data, useLoaderData } from 'react-router'
import type { Route } from './+types/work-detail'

export const loader = ({ params }: Route.LoaderArgs) => {
    if (!isWorkKey(params.slug)) {
        throw data('not-found', { status: 404 })
    }
    return works[params.slug]
}

export const meta = ({ params }: Route.MetaArgs) => {
    if (!isWorkKey(params.slug)) {
        return [{ title: 'Not Found' }]
    }
    return [{ title: works[params.slug].title }]
}

export default function WorkDetailPage() {
    const work = useLoaderData<typeof loader>()
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1>{work.content}</h1>
            <p>準備中</p>
        </div>
    )
}
