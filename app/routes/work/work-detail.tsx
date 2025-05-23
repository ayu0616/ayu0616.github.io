import { data, redirect } from 'react-router'
import { isWorkKey, workContents, works } from '~/constant/works'
import type { Route } from './+types/work-detail'

export const loader = ({ params }: Route.LoaderArgs) => {
    if (!isWorkKey(params.slug)) {
        throw data('not-found', { status: 404 })
    }
    if (params.slug === 'ig-story-extend') {
        return redirect('/ig-story-extend')
    }
    if (params.slug === 'ig-moment-story') {
        return redirect('/ig-moment-story')
    }

    return works[params.slug]
}

export const meta = ({ params }: Route.MetaArgs) => {
    if (!isWorkKey(params.slug)) {
        return [{ title: 'Not Found' }]
    }
    return [{ title: works[params.slug].title }]
}

const Content = ({ slug }: { slug: string }) =>
    isWorkKey(slug) ? workContents[slug] : null

export default function WorkDetailPage({ params }: Route.ComponentProps) {
    return (
        <div className="mx-auto max-w-(--breakpoint-sm) px-4 py-8">
            <div className="rounded border bg-white p-4">
                <Content slug={params.slug} />
            </div>
        </div>
    )
}
