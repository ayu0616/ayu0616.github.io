import { useMemo } from 'react'

import type { EmbedOption } from '../Embed'

export interface YoutubeEmbedProps {
    option: EmbedOption
}

const defaultOption: Partial<EmbedOption> = {
    aspect: '16 / 9',
    width: '50%',
}

// TODO: next/third-partiesを使う （参考：https://zenn.dev/chot/articles/introduction-of-next-third-parties）
const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ ...props }) => {
    const option = { ...defaultOption, ...props.option }
    const src = useMemo(() => {
        const url = new URL(option.src)
        const pathName = url.pathname
        if (pathName.startsWith('/watch')) {
            const searchParams = new URLSearchParams(url.search)
            const videoId = searchParams.get('v')
            if (!videoId) {
                throw new Error('Invalid YouTube URL')
            }
            return `https://www.youtube.com/embed/${videoId}`
        }
        const urlMatch = /(\/embed)?\/(.*)[\/\?]?.*/.exec(pathName)
        if (!urlMatch) {
            throw new Error('Invalid YouTube URL')
        }
        const videoId = urlMatch[2]
        return `https://www.youtube.com/embed/${videoId}`
    }, [option.src])
    const { aspect } = option
    return (
        <iframe
            {...{ ...option, src }}
            className="mx-auto rounded-md border-none drop-shadow-md"
            style={{ aspectRatio: aspect }}
        />
    )
}

export default YoutubeEmbed
