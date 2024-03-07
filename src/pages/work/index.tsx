import { Link } from 'react-router-dom'

import { works } from '../../constant/works'

export const Work = () => {
    return (
        <div>
            {(Object.keys(works) as (keyof typeof works)[]).map((slug) => {
                const { title } = works[slug]
                return <Link to={`./${slug}`}>{title}</Link>
            })}
        </div>
    )
}
