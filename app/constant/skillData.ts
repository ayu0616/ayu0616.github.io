import dayjs, { type Dayjs } from 'dayjs'
import color from 'tailwindcss/colors'

import cppLogo from '../assets/skillLogo/cpp.svg'
import dockerLogo from '../assets/skillLogo/docker.svg'
import htmlLogo from '../assets/skillLogo/html.svg'
import javaLogo from '../assets/skillLogo/java.svg'
import jsLogo from '../assets/skillLogo/js.svg'
import nextjsLogo from '../assets/skillLogo/nextjs.svg'
import pythonLogo from '../assets/skillLogo/python.svg'
import rLogo from '../assets/skillLogo/r.svg'
import reactLogo from '../assets/skillLogo/react.svg'
import remixLogo from '../assets/skillLogo/remix.svg'
import rustLogo from '../assets/skillLogo/rust.svg'
import tsLogo from '../assets/skillLogo/ts.svg'
import vueLogo from '../assets/skillLogo/vue.svg'

interface SkillDataInput {
    color: string
    dateRange: [Dayjs, Dayjs]
    id?: string
    logo: string
    skillName: string
}

interface SkillData extends SkillDataInput {
    dateRangeNum: [number, number]
    id: string
}

export type SkillName = (typeof skillData)[number]['skillName']

export const dateMax = dayjs()

const _data = [
    {
        color: color.red['600'],
        dateRange: [dayjs('2021-03'), dateMax],
        id: 'HTML-CSS',
        logo: htmlLogo,
        skillName: 'HTML・CSS',
    },
    {
        color: color.yellow['500'],
        dateRange: [dayjs('2021-03'), dateMax],
        logo: jsLogo,
        skillName: 'JavaScript',
    },
    {
        color: color.cyan['600'],
        dateRange: [dayjs('2021-06'), dateMax],
        logo: pythonLogo,
        skillName: 'Python',
    },
    {
        color: color.violet['600'],
        dateRange: [dayjs('2023-03'), dateMax],
        id: 'Cpp',
        logo: cppLogo,
        skillName: 'C++',
    },
    {
        color: color.blue['600'],
        dateRange: [dayjs('2022-01'), dateMax],
        logo: tsLogo,
        skillName: 'TypeScript',
    },
    {
        color: color.blue['800'],
        dateRange: [dayjs('2022-04'), dayjs('2023-01')],
        logo: rLogo,
        skillName: 'R',
    },
    {
        color: color.orange['400'],
        dateRange: [dayjs('2022-04'), dayjs('2022-07')],
        logo: javaLogo,
        skillName: 'Java',
    },
    {
        color: color.orange['600'],
        dateRange: [dayjs('2024-01'), dateMax],
        logo: rustLogo,
        skillName: 'Rust',
    },
    {
        color: color.emerald['500'],
        dateRange: [dayjs('2023-07'), dayjs('2024-06')],
        logo: vueLogo,
        skillName: 'Vue.js',
    },
    {
        color: color.sky['400'],
        dateRange: [dayjs('2022-01'), dateMax],
        logo: reactLogo,
        skillName: 'React.js',
    },
    {
        color: color.slate['600'],
        dateRange: [dayjs('2024-01'), dateMax],
        logo: remixLogo,
        skillName: 'Remix',
    },
    {
        color: color.gray['400'],
        dateRange: [dayjs('2022-10'), dateMax], // TODO: 要調査
        logo: nextjsLogo,
        skillName: 'Next.js',
    },
    {
        color: color.sky['600'],
        dateRange: [dayjs('2023-03'), dateMax], // TODO: 要調査
        logo: dockerLogo,
        skillName: 'Docker',
    },
    {
        color: color.gray['800'],
        dateRange: [dayjs('2022-11'), dateMax],
        logo: '',
        skillName: 'AtCoder',
    },
] satisfies SkillDataInput[]

const skillData = _data.map((d) => ({
    ...d,
    dateRangeNum: d.dateRange.map((date) => date.valueOf()) as [number, number],
    id: d.id ?? d.skillName,
})) satisfies SkillData[]

skillData.sort((a, b) => {
    const diff = a.dateRangeNum[0] - b.dateRangeNum[0]
    if (diff === 0) {
        return a.dateRangeNum[1] - b.dateRangeNum[1]
    }
    return diff
})

export default skillData
