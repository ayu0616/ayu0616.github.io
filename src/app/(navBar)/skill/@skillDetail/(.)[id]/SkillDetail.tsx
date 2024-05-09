'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { SkillData } from '@/constant/skillData'

export interface SkillDetailProps {
    skill: SkillData
}

const SkillDetail = ({ skill }: SkillDetailProps) => {
    const router = useRouter()
    return (
        <div
            className='fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center bg-black/50'
            onClick={() => router.back()}
        >
            <div
                className='flex h-[600px] max-h-[90%] w-[500px] max-w-[90%] flex-col items-center justify-center gap-6 rounded-md bg-white p-6'
                onClick={(e) => e.stopPropagation()}
            >
                <h1
                    className='text-3xl font-bold'
                    style={{ color: skill.color }}
                >
                    {skill.skillName}
                </h1>
                <p>準備中</p>
                <div className='flex aspect-square h-16 w-16 items-center justify-center'>
                    <Image
                        alt='logo'
                        className='drag-none max-h-full max-w-full'
                        height={0}
                        src={skill.logo}
                        width={0}
                    />
                </div>
                <div>
                    {skill.dateRange[0].format('YYYY年MM月')} 〜{' '}
                    {skill.dateRange[1].format('YYYY年MM月')}
                </div>
            </div>
        </div>
    )
}

export default SkillDetail
