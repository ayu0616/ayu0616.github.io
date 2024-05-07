'use client'

import { ComponentProps, createRef, useEffect } from 'react'

export interface BlockquoteProps extends ComponentProps<'blockquote'> {}

const Blockquote: React.FC<BlockquoteProps> = (props) => {
    const isTwitter = props.className?.split(' ').includes('twitter-tweet')
    const ref = createRef<HTMLQuoteElement>()
    useEffect(() => {
        if (isTwitter) {
            window.twttr?.widgets.load(ref.current)
        }
    }, [isTwitter, ref])
    return (
        <div className='flex w-full justify-center'>
            <blockquote ref={ref} {...props} />
        </div>
    )
}

export default Blockquote
