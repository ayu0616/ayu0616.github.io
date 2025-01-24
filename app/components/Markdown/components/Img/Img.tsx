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
    if (src.endsWith('.svg')) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                alt={alt}
                className="mx-auto max-h-[50vh] object-contain"
                loading="lazy"
                src={src}
            />
        )
    }
    return (
        <figure className="mx-auto w-fit">
            <img
                alt={alt}
                className="max-h-[50vh] object-contain"
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
