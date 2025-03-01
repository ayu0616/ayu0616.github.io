import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { GCS_URL, PROD } from '~/constant/others'
import { urlJoin } from '~/util/url'

export interface ImgProps {
    alt?: string
    src: string
}

export const Img: React.FC<ImgProps> = ({ alt = '', ...props }) => {
    const src = (() => {
        const isHttp = props.src.startsWith('http')
        if (isHttp) {
            return props.src
        }
        if (PROD) {
            const filename = props.src
                .replace('assets/', '')
                .replaceAll('/', '')
            return urlJoin(GCS_URL, 'assets', filename)
        }
        const toPath = ['/blog-image', props.src.replace('assets/', '')].join(
            '/',
        )
        return toPath
    })()
    // if (src.endsWith('.json')) {
    //     // 独自定義オブジェクトの場合
    //     const jsonPath = fs.globSync(
    //         path.join(process.cwd(), 'blog-contents', '**', dirname, '*.json'),
    //     )[0]
    //     if (!jsonPath) {
    //         throw new Error('jsonPath is not found')
    //     }
    //     return <OriginalObject alt={alt} filePath={jsonPath} />
    // }
    return (
        <figure className="w-full">
            <img
                alt={alt}
                className="mx-auto max-h-[50vh] rounded object-contain drop-shadow-md"
                loading="lazy"
                src={src}
            />
            {alt && (
                <figcaption className="mt-2 whitespace-break-spaces text-gray-700 text-sm [line-break:anywhere]">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}

const SvgImg: FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const { data } = useQuery({
        queryKey: ['blog-image', src],
        queryFn: () => fetch(src).then((res) => res.text()),
        staleTime: 1000 * 60 * 60 * 24,
    })
    return (
        <figure className="mx-auto w-fit">
            <div
                className="mx-auto size-fit [&>svg]:max-h-[50vh]"
                dangerouslySetInnerHTML={{ __html: data ?? '' }}
            />
            {alt && (
                <figcaption className="mt-2 whitespace-break-spaces text-gray-700 text-sm [line-break:anywhere]">
                    {alt}
                </figcaption>
            )}
        </figure>
    )
}
