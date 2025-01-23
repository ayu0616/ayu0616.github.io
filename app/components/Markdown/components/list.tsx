import { cn } from 'app/lib/utils'
import type { ComponentPropsWithRef, FC } from 'react'

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
