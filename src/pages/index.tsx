import { Link } from 'react-router-dom'

import Icon from '../assets/icon.webp'
import { SNSIconList } from '../components/SNSIcon/SNSIconList'

const links = [
    {
        name: 'work',
        path: '/work',
    },
    {
        name: 'skill',
        path: '/skill',
    },
    {
        name: 'blog',
        path: '/blog',
    },
] as const

export const Index = () => {
    return (
        <div className='flex h-dvh flex-col items-center gap-12 p-12 lg:flex-row'>
            <div>
                <img
                    alt='アイコン'
                    className='aspect-square max-h-[50dvh] rounded-full border-[max(1dvh,_1dvw)] border-emerald-800 drop-shadow-lg transition-transform duration-300 ease-in-out drag-none hover:scale-105 lg:max-h-none lg:max-w-[50dvw]'
                    src={Icon}
                />
            </div>
            <div className='grid flex-1 justify-center gap-8'>
                <h1 className='text-2xl font-bold lg:text-3xl'>
                    はっさくゼリー製造工場
                </h1>
                <ul>
                    {links.map((link) => (
                        <li
                            key={link.name}
                            className='underline-offset-1 hover:underline'
                        >
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <div>
                    <SNSIconList></SNSIconList>
                </div>
            </div>
        </div>
    )
}
