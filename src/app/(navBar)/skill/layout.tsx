import { ReactNode } from 'react'

import skillData from '@/constant/skillData'

export const generateStaticParams = () => skillData.map(({ id }) => ({ id }))

export default function Layout({
    children,
    skillDetail,
}: {
    children: ReactNode
    skillDetail: ReactNode
}) {
    return (
        <>
            {children}
            {skillDetail}
        </>
    )
}
