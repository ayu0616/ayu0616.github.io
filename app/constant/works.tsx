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
    'ig-story-extend': {
        title: 'Instagram ストーリー時間設定ツール',
    },
    'ig-moment-story': {
        title: 'Instagram ストーリー瞬間保存ツール',
    },
} as const satisfies { [key: string]: Work }

type WorkKey = keyof typeof works

export const isWorkKey = (key: string): key is WorkKey => key in works

export const workContents = {
    beaujolais: (
        <iframe
            src="https://trash-can-frontend-zhqzb2nbkq-an.a.run.app/sommelier"
            title="ボジョレー・ヌーヴォー エセソムリエ生成器"
            className="h-[calc(100dvh-200px)] w-full"
        />
    ),
    'japan-weekend-clock': <JapanWeekendClock />,
    'ig-story-extend': <></>, // app/routes/work/work-detail.tsx にてリダイレクト設定
    'ig-moment-story': <></>, // app/routes/work/work-detail.tsx にてリダイレクト設定
} as const satisfies Record<WorkKey, ReactNode>
