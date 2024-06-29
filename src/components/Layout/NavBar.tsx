import Image from 'next-export-optimize-images/picture'
import Link from 'next/link'

import IconMini from '@/../public/icon-mini.webp'
import Icon from '@/../public/icon.webp'
import NavLink from '@/components/Link/NavLink'
import pages from '@/constant/pages'

const NavBar = () => (
    <nav className='sticky top-0 z-50 flex h-20 w-full items-center gap-6 bg-emerald-800 px-4 py-2 text-white sm:h-24'>
        <Link className='aspect-square h-full' href='/'>
            <Image
                alt='icon'
                blurDataURL={IconMini.src}
                className='drag-none aspect-square h-full rounded-full object-contain drop-shadow transition-transform duration-300 ease-in-out hover:scale-105'
                height={64}
                loading='lazy'
                placeholder='blur'
                src={Icon}
                width={64}
            />
        </Link>
        <div className='flex h-full !list-none items-center gap-2'>
            {pages.map(({ icon, name, path }) => (
                <NavLink
                    key={path}
                    activeClassName='bg-white/10'
                    className='flex aspect-square h-full items-center justify-center gap-2 rounded-md px-2 text-xl transition-colors hover:bg-white/10 sm:aspect-auto sm:text-base'
                    href={path}
                >
                    {icon}
                    <span className='hidden sm:block'>{name}</span>
                </NavLink>
            ))}
        </div>
    </nav>
)

export default NavBar
