'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import Markdown from 'react-markdown'
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import skillData, { dateMax } from '@/constant/skillData'
import { charCount } from '@/util/charCount'

const SkillPageContent = () => {
    const router = useRouter()
    return (
        <div className='mx-auto flex h-full w-dvw max-w-screen-lg flex-col gap-4 p-6'>
            <div className='space-y-2 rounded-md border bg-white p-4'>
                <Markdown>{`## 技術スタック

-   軸
    -   縦軸 ： 技術スタック
    -   横軸 ： 技術スタックを使用していた期間
-   棒グラフの棒をクリックすると、対応した技術スタックの詳細ページに遷移
`}</Markdown>
            </div>
            <div className='flex-1 rounded-md border bg-white'>
                <ResponsiveContainer className={'md:px-8'} width={'100%'}>
                    <BarChart
                        data={skillData}
                        height={250}
                        layout='vertical'
                        margin={{ bottom: 20, left: 20, right: 20, top: 20 }}
                        width={730}
                    >
                        <XAxis
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={(unix) =>
                                dayjs(unix).format('YYYY-MM')
                            }
                            type='number'
                        />
                        <YAxis
                            dataKey='skillName'
                            type='category'
                            width={
                                8 *
                                    skillData.reduce(
                                        (prev, { skillName }) =>
                                            Math.max(
                                                prev,
                                                charCount(skillName),
                                            ),
                                        0,
                                    ) +
                                20
                            }
                        />
                        <Tooltip formatter={tooltipFormatter} />
                        <Bar
                            className='cursor-pointer'
                            dataKey='dateRangeNum'
                            fill='color'
                        >
                            {skillData.map(({ color, id }, i) => (
                                <Cell
                                    key={i}
                                    className='hover:opacity-80'
                                    fill={color}
                                    onClick={() => {
                                        const url = `/skill/${id}`
                                        router.push(url)
                                    }}
                                ></Cell>
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const tooltipFormatter = (value: string | number | (string | number)[]) => {
    switch (typeof value) {
        case 'number':
        case 'string':
            return [`${dayjs(value).format('YYYY-MM')}`, '期間']
        default:
            return [
                `${value
                    .map((v) => {
                        const d = dayjs(v)
                        if (d.valueOf() === dateMax.valueOf()) return '継続中'
                        else return d.format('YYYY-MM')
                    })
                    .join(' 〜 ')}`,
                '期間',
            ]
    }
}

export default SkillPageContent
