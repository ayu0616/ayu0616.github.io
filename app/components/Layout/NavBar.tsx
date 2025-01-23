import { Link, NavLink } from 'react-router'

import pages from 'app/constant/pages'
import { cn } from 'app/lib/utils'

const NavBar = () => (
    <nav
        id="nav-bar"
        className="sticky top-0 z-50 flex h-20 w-full items-center gap-6 bg-emerald-800 px-4 py-2 text-white sm:h-24"
    >
        <Link className="aspect-square h-full" to={{ pathname: '/' }}>
            <img
                alt="icon"
                className="drag-none aspect-square h-full rounded-full object-contain drop-shadow transition-transform duration-300 ease-in-out hover:scale-105"
                height={64}
                loading="lazy"
                src={'/icon.webp'}
                width={64}
            />
        </Link>
        <div className="!list-none flex h-full items-center gap-2">
            {pages.map(({ icon, name, path }) => (
                <NavLink
                    key={path}
                    className={(props) =>
                        cn(
                            'flex aspect-square h-full items-center justify-center gap-2 rounded-md px-2 text-xl transition-colors hover:bg-white/10 sm:aspect-auto sm:text-base',
                            props.isActive && 'bg-white/10',
                        )
                    }
                    to={{ pathname: path }}
                >
                    {icon}
                    <span className="hidden sm:block">{name}</span>
                </NavLink>
            ))}
        </div>
    </nav>
)

export default NavBar
