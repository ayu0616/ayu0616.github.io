import { FaHome } from 'react-icons/fa'
import { FaCode, FaPencil, FaWandMagicSparkles } from 'react-icons/fa6'

interface PageInfo {
    icon: JSX.Element
    name: string
    path: string
}

const pages = [
    { icon: <FaHome />, name: 'Home', path: '/' },
    { icon: <FaCode />, name: 'Skill', path: '/skill' },
    {
        icon: <FaWandMagicSparkles />,
        name: 'Work',
        path: '/work',
    },
    { icon: <FaPencil />, name: 'Blog', path: '/blog' },
] as const satisfies PageInfo[]

export default pages
