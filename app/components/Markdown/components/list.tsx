import type { ComponentPropsWithRef, FC } from 'react'
import { cn } from '~/lib/utils'

export const Li: FC<ComponentPropsWithRef<'li'>> = ({
    className,
    children,
    ...props
}) => {
    return (
        <li {...props} className={cn('flex', className)}>
            <div>{children}</div>
        </li>
    )
}
