/* eslint-disable jsx-a11y/alt-text */ // altを別の場所で設定しているため
import Image, { ImageProps } from 'next/image'

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
        <div className='group rounded-full'>
            <SNSIcon
                {...props}
                icon={
                    <>
                        <Image
                            {...imgProps}
                            className='drag-none absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                            src='https://img.atcoder.jp/assets/top/img/logo_wh.svg'
                        />
                        <Image
                            {...imgProps}
                            className='drag-none absolute transition-opacity duration-500 group-hover:opacity-0'
                            src='https://img.atcoder.jp/assets/top/img/logo_bk.svg'
                        />
                    </>
                }
            ></SNSIcon>
        </div>
    )
}
