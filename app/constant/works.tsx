import type { ReactNode } from 'react'
import { JapanWeekendClock } from '../components/pages/japan-weekend-clock/page'

export interface Work {
    title: string
}

export const works = {
    beaujolais: {
        title: 'ボジョレー・ヌーヴォー エセソムリエ生成器',
    },
    'japan-weekend-clock': {
        title: '日本週末時計',
    },
} as const satisfies { [key: string]: Work }

type WorkKey = keyof typeof works

export const isWorkKey = (key: string): key is WorkKey => key in works

export const workContents = {
    beaujolais: (
        <div>
            <p>Beaujolais</p>
            <p>準備中</p>
        </div>
    ),
    'japan-weekend-clock': <JapanWeekendClock />,
} as const satisfies Record<WorkKey, ReactNode>
