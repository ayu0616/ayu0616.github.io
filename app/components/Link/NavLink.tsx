'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { type ComponentPropsWithRef, useMemo } from 'react'
import { Link } from 'react-router'

export interface NavLinkProps extends ComponentPropsWithRef<typeof Link> {
    activeClassName?: string
    children?: React.ReactNode
    className?: string
}

const NavLink: React.FC<NavLinkProps> = ({
    activeClassName,
    className,
    ...props
}: NavLinkProps) => {
    const pathName = usePathname()
    const { to } = props
    const isActive = useMemo(() => {
        if (!(to && pathName)) {
            return false
        }
        if (typeof to === 'string') {
            if (to === '/') {
                return pathName === '/'
            }
            return pathName.startsWith(to)
        }
        const toPath = to.pathname
        if (!toPath) {
            return false
        }
        if (toPath === '/') {
            return pathName === '/'
        }
        return pathName.startsWith(toPath)
    }, [to, pathName])
    const classNameList = [className]
    if (isActive) {
        classNameList.push(activeClassName)
    }

    return <Link className={cn(...classNameList)} {...props} />
}

export default NavLink
