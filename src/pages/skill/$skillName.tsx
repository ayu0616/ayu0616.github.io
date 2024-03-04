import { useParams } from 'react-router-dom'

import skillData, { SkillName } from '../../constant/skillData'

export const SkillDetail = () => {
    const params = useParams<{ skillName: SkillName }>()
    const { skillName } = params
    const skill = skillData.find((s) => s.skillName === skillName)
    if (!skill) {
        return <div>not found</div>
    }
    return (
        <div className='flex h-dvh w-dvw flex-col items-center justify-center gap-6'>
            <h1 className='text-3xl font-bold' style={{ color: skill.color }}>
                {skillName}
            </h1>
            <p>準備中</p>
            <div className='flex aspect-square h-16 w-16 items-center justify-center'>
                <img
                    alt='logo'
                    className='max-h-full max-w-full drag-none'
                    src={skill.logo}
                />
            </div>
        </div>
    )
}
