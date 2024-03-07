import { useParams } from 'react-router-dom'

import { works } from '../../constant/works'

export const WorkDetail = () => {
    const param = useParams<{ slug: keyof typeof works }>()
    const { slug } = param
    if (!slug) {
        return <div>not found</div>
    }

    return <>{works[slug].content}</>
}
