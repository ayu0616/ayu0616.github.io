import { redirect } from 'next/navigation'

import skillData from '@/constant/skillData'

import SkillDetail from './SkillDetail'

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params
    const skill = skillData.find((s) => s.id === id)
    if (!skill) {
        return redirect('/404')
    }
    return <SkillDetail skill={skill} />
}
