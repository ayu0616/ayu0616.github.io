'use client'

import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export interface NavLinkProps extends LinkProps {
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
    const { href } = props
    const isActive = useMemo(() => {
        if (!(href && pathName)) {
            return false
        }
        if (typeof href === 'string') {
            if (href === '/') {
                return pathName === '/'
            }
            return pathName.startsWith(href)
        }
        const hrefPath = href.pathname
        if (!hrefPath) {
            return false
        }
        if (hrefPath === '/') {
            return pathName === '/'
        }
        return pathName.startsWith(hrefPath)
    }, [href, pathName])
    const classNameList = [className]
    if (isActive) {
        classNameList.push(activeClassName)
    }

    return <Link className={cn(...classNameList)} {...props} />
}

export default NavLink
