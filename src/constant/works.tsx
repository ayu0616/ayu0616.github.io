import { ReactNode } from 'react'

import BeaujolaisAI from '../components/works/BeaujolaisAI.mdx'

export interface Work {
    content: ReactNode
    title: string
}

export const works = {
    beaujolais: {
        content: <BeaujolaisAI />,
        title: 'ボジョレー・ヌーヴォー エセソムリエ生成器',
    },
} as const satisfies { [key: string]: Work }
