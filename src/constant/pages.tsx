import { FaHome } from 'react-icons/fa'
import { FaCode, FaWandMagicSparkles, FaPencil } from 'react-icons/fa6'

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
] as const satisfies PageInfo[]

export default pages
