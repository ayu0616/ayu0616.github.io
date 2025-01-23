'use client'

import { useState } from 'react'
import { FaTwitter, FaXTwitter } from 'react-icons/fa6'

import { cn } from 'app/lib/utils'
import { SNSIcon } from './SNSIcon'

export interface TwitterProps {
    className?: string
    link: string
    name: string
}

export const Twitter = ({ className, ...props }: TwitterProps) => {
    const [isTwitter, setIsTwitter] = useState(true)
    const handleMouseLeave = () => {
        setIsTwitter((prev) => !prev)
    }
    const twitterClassName = 'hover:bg-blue-400 hover:outline-blue-500'
    const xClassName = 'hover:bg-gray-600 hover:outline-gray-700'
    return (
        <div
            className="group rounded-full"
            data-is-twitter={isTwitter}
            onMouseLeave={handleMouseLeave}
        >
            <SNSIcon
                {...props}
                className={cn(
                    isTwitter ? twitterClassName : xClassName,
                    className,
                )}
                icon={
                    <>
                        <FaTwitter className='absolute opacity-0 transition-opacity duration-500 group-data-[is-twitter="true"]:opacity-100' />
                        <FaXTwitter className='absolute opacity-0 transition-opacity duration-500 group-data-[is-twitter="false"]:opacity-100' />
                    </>
                }
            />
        </div>
    )
}
