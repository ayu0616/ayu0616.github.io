import { ReactNode } from 'react'

export interface Work {
    content: ReactNode
    title: string
}

export const works = {
    beaujolais: {
        content: <div>Beaujolais</div>,
        title: 'ボジョレー・ヌーヴォー エセソムリエ生成器',
    },
} as const satisfies { [key: string]: Work }
