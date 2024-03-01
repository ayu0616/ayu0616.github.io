import { ComponentProps } from 'react'

import { SNSIcon } from './SNSIcon'

export interface AtCoderProps {
    className?: string
    link: string
    name: string
}

export const AtCoder = ({ ...props }: AtCoderProps) => {
    const imgProps: ComponentProps<'img'> = {
        alt: 'atcoder',
        height: 20,
        width: 20,
    }
    return (
        <div className='group rounded-full'>
            <SNSIcon
                {...props}
                icon={
                    <>
                        <img
                            {...imgProps}
                            className='absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                            src='https://img.atcoder.jp/assets/top/img/logo_wh.svg'
                        />
                        <img
                            {...imgProps}
                            className='absolute transition-opacity duration-500 group-hover:opacity-0'
                            src='https://img.atcoder.jp/assets/top/img/logo_bk.svg'
                        />
                    </>
                }
            ></SNSIcon>
        </div>
    )
}
