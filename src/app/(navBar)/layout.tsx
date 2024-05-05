import Image from 'next/image'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { FaCode, FaPencil, FaWandMagicSparkles } from 'react-icons/fa6'

import Icon from '@/../public/icon.webp'
import NavLink from '@/components/Link/NavLink'

interface PageInfo {
    icon: JSX.Element
    name: string
    path: string
}

const pages = [
    { icon: <FaHome></FaHome>, name: 'Home', path: '/' },
    { icon: <FaCode></FaCode>, name: 'Skill', path: '/skill' },
    {
        icon: <FaWandMagicSparkles></FaWandMagicSparkles>,
        name: 'Work',
        path: '/work',
    },
    { icon: <FaPencil></FaPencil>, name: 'Blog', path: '/blog' },
] satisfies PageInfo[]

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-dvh flex-col'>
            <nav className='sticky top-0 flex w-full items-center gap-6 bg-emerald-800 px-4 py-2 text-white'>
                <Link href='/'>
                    <Image
                        alt='icon'
                        className='drag-none aspect-square rounded-full drop-shadow transition-transform duration-300 ease-in-out hover:scale-105'
                        height={64}
                        src={Icon}
                        width={64}
                    />
                </Link>
                <div className='flex h-full !list-none items-center gap-2'>
                    {pages.map(({ icon, name, path }) => (
                        <NavLink
                            key={path}
                            activeClassName='bg-white/10'
                            className='flex h-full items-center gap-2 rounded-md px-2 transition-colors hover:bg-white/10'
                            href={path}
                        >
                            {icon}
                            <span>{name}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
            <div className='flex-1'>{children}</div>
        </div>
    )
}
