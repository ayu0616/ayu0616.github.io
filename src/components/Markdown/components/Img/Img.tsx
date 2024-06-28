import path from 'path'

import Image from 'next-export-optimize-images/picture'

export interface ImgProps {
    alt?: string
    slug: string
    src: string
}

export const Img: React.FC<ImgProps> = async ({ alt = '', slug, ...props }) => {
    const src = await (async () => {
        const isHttp = props.src.startsWith('http')
        if (isHttp) {
            return props.src
        } else {
            const toPath = path.join(
                '/blog-image',
                slug,
                props.src.replace('assets/', ''),
            )
            return toPath
        }
    })()
    if (src.endsWith('.svg'))
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                alt={alt}
                className='mx-auto max-h-[50vh] object-contain'
                loading='lazy'
                src={src}
            />
        )
    return (
        <Image
            alt={alt}
            className='mx-auto max-h-[50vh] object-contain'
            height={1000}
            layout='responsive'
            loading='lazy'
            src={src}
            width={1000}
        />
    )
}
