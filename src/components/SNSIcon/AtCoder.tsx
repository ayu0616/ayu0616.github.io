/* eslint-disable jsx-a11y/alt-text */ // altを別の場所で設定しているため
import type { ImageProps } from 'next/image'
import Image from 'next/image'

import AtCoderIconBlack from '@/assets/atcoder/atcoder-black.png'
import AtCoderIconWhite from '@/assets/atcoder/atcoder-white.png'

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
    } satisfies Partial<ImageProps>
    return (
        <div className="group rounded-full">
            <SNSIcon
                {...props}
                icon={
                    <>
                        <Image
                            {...imgProps}
                            className="drag-none absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            src={AtCoderIconWhite}
                        />
                        <Image
                            {...imgProps}
                            className="drag-none absolute transition-opacity duration-500 group-hover:opacity-0"
                            src={AtCoderIconBlack}
                        />
                    </>
                }
            />
        </div>
    )
}
