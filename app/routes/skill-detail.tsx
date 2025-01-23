import skillData from 'app/constant/skillData'
import { data, redirect, useLoaderData } from 'react-router'
import type { Route } from './+types/skill-detail'

export const meta = ({ params }: Route.MetaArgs) => {
    const skill = skillData.find((s) => s.id === params.id)
    return [{ title: skill?.skillName }]
}

export const loader = ({ params }: Route.LoaderArgs) => {
    if (params.id === 'AtCoder') {
        return redirect('/atcoder')
    }
    const skill = skillData.find((s) => s.id === params.id)
    if (!skill) {
        throw data('not-found', { status: 404 })
    }
    return skill
}

export default function Page({ params }: Route.ComponentProps) {
    const skill = useLoaderData<typeof loader>()
    return (
        <div className="flex h-full w-dvw flex-col items-center justify-center gap-6">
            <h1 className="font-bold text-3xl" style={{ color: skill.color }}>
                {skill.skillName}
            </h1>
            <p>準備中</p>
            <div className="flex aspect-square h-16 w-16 items-center justify-center">
                <img
                    alt="logo"
                    className="drag-none max-h-full max-w-full"
                    src={skill.logo}
                />
            </div>
        </div>
    )
}
