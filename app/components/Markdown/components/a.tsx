import { cn } from 'app/lib/utils'
import type { ComponentPropsWithRef, FC } from 'react'
import { Link } from 'react-router'

export const Anchor: FC<ComponentPropsWithRef<'a'>> = ({
    className,
    children,
    href,
    ...props
}) => (
    <Link
        {...props}
        className={cn(
            'inline-block break-all text-emerald-800 underline decoration-1 underline-offset-1',
            className,
        )}
        to={href ?? '#'}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        target={href?.startsWith('http') ? '_blank' : undefined}
    >
        {children}
    </Link>
)
