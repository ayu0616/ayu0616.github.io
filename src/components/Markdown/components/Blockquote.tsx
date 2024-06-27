'use client'

import { ComponentProps, createRef, useEffect } from 'react'

import { cn } from '@/util/cn'

export interface BlockquoteProps extends ComponentProps<'blockquote'> {}

const Blockquote: React.FC<BlockquoteProps> = ({ className, ...props }) => {
    const isTwitter = className?.split(' ').includes('twitter-tweet')
    const ref = createRef<HTMLQuoteElement>()
    useEffect(() => {
        if (isTwitter) {
            window.twttr?.widgets.load(ref.current)
        }
    }, [isTwitter, ref])
    return (
        <div
            className={cn(
                'flex w-full justify-center',
                !isTwitter && 'border-l-2 border-emerald-800',
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

export default Blockquote
