import AtCoderIconBlack from '~/assets/atcoder/atcoder-black.png'
import AtCoderIconWhite from '~/assets/atcoder/atcoder-white.png'

import type { ComponentPropsWithRef } from 'react'
import { SNSIcon } from './SNSIcon'

export interface AtCoderProps {
    className?: string
    link: string
    name: string
}

export const AtCoder = ({ ...props }: AtCoderProps) => {
    const imgProps = {
        alt: 'atcoder',
        height: 20,
        width: 20,
    } satisfies ComponentPropsWithRef<'img'>
    return (
        <div className="group rounded-full">
            <SNSIcon
                {...props}
                icon={
                    <>
                        <img
                            {...imgProps}
                            alt={imgProps.alt}
                            className="drag-none absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            src={AtCoderIconWhite as unknown as string}
                        />
                        <img
                            {...imgProps}
                            alt={imgProps.alt}
                            className="drag-none absolute transition-opacity duration-500 group-hover:opacity-0"
                            src={AtCoderIconBlack as unknown as string}
                        />
                    </>
                }
            />
        </div>
    )
}
