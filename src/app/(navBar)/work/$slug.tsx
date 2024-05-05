import { useParams } from 'next/navigation'

import { works } from '../../../constant/works'

export const WorkDetail = () => {
    const param = useParams<{ slug: keyof typeof works }>()
    const { slug } = param
    if (!slug) {
        return <div>not found</div>
    }

    return <>{works[slug].content}</>
}
