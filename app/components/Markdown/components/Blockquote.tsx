'use client'

import type React from 'react'
import { type ComponentProps, createRef } from 'react'

import { cn } from '~/lib/utils'

export interface BlockquoteProps extends ComponentProps<'blockquote'> {}

const Blockquote: React.FC<BlockquoteProps> = (props) => {
    const { className } = props
    const isTwitter = className?.split(' ').includes('twitter-tweet')
    const isInstagram = className?.split(' ').includes('instagram-media')
    const ref = createRef<HTMLQuoteElement>()
    // useEffect(() => {
    //     if (isTwitter) {
    //         window.twttr?.widgets.load(ref.current)
    //     }
    // }, [isTwitter, ref])

    if (isInstagram) {
        return <InstagramQuote {...props} />
    }

    return (
        <div
            className={cn(
                'flex w-full justify-center',
                !isTwitter && 'border-emerald-800 border-l-2',
            )}
        >
            <blockquote
                ref={ref}
                {...props}
                className={cn(
                    !isTwitter &&
                        'size-full rounded bg-slate-50 p-1 pl-4 text-slate-700',
                    className,
                )}
            />
        </div>
    )
}

const InstagramQuote: React.FC<BlockquoteProps> = (props) => {
    return (
        <div className="flex items-center justify-center">
            <blockquote {...props} />
        </div>
    )
}

export default Blockquote
