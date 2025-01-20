import type { Route } from './+types/home'

import { Link } from 'react-router'

import pages from '@/constant/pages'

import { SNSIconList } from '../components/SNSIcon/SNSIconList'

export function meta({ params }: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' },
    ]
}

export default function Home() {
    return (
        <div className="flex h-dvh flex-col items-center gap-12 p-12 lg:flex-row">
            <div className="aspect-square max-h-[50dvh] rounded-full lg:max-h-none lg:max-w-[50dvw]">
                <img
                    alt="アイコン"
                    className="rounded-full border-[max(1dvh,_1dvw)] border-emerald-800 drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                    loading="lazy"
                    src={'/icon.webp'}
                />
            </div>
            <div className="grid flex-1 justify-center gap-8">
                <h1 className="font-bold text-2xl lg:text-3xl">
                    はっさくゼリー製造工場
                </h1>
                <div>
                    {pages
                        .filter(({ path }) => path !== '/')
                        .map((page) => (
                            <Link
                                key={page.name}
                                className="flex items-center gap-2 rounded px-2 py-1 text-lg underline underline-offset-4 transition-colors hover:bg-slate-100"
                                to={{
                                    pathname: page.path,
                                }}
                            >
                                {page.icon}
                                <span>{page.name}</span>
                            </Link>
                        ))}
                </div>
                <div>
                    <SNSIconList />
                </div>
            </div>
        </div>
    )
}
