import { cn } from 'app/lib/utils'
import type { ReactNode } from 'react'

export interface SNSIconProps {
    className?: string
    icon: ReactNode
    link: string
    name: string
}

export const SNSIcon = ({
    name,
    link,
    className = '',
    icon,
    ...props
}: SNSIconProps) => {
    return (
        <a
            key={name}
            className="block rounded-full"
            href={link}
            rel="noreferrer"
            target="_blank"
        >
            <div
                className={cn(
                    'flex aspect-square h-12 w-12 items-center justify-center rounded-full p-2 outline outline-offset-[-4px]',
                    className,
                )}
            >
                {icon}
            </div>
        </a>
    )
}
