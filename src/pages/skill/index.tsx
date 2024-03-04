import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import skillData, { dateMax } from '../../constant/skillData'
import { charCount } from '../../util/charCount'

export const Skill = () => {
    const navigate = useNavigate()

    return (
        <div className='h-dvh w-dvw'>
            <ResponsiveContainer className={'px-8'} width={'100%'}>
                <BarChart
                    data={skillData}
                    height={250}
                    layout='vertical'
                    margin={{ bottom: 20, left: 20, right: 20, top: 20 }}
                    width={730}
                >
                    <XAxis
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(unix) => dayjs(unix).format('YYYY-MM')}
                        type='number'
                    />
                    <YAxis
                        dataKey='skillName'
                        type='category'
                        width={
                            8 *
                            skillData.reduce(
                                (prev, { skillName }) =>
                                    Math.max(prev, charCount(skillName)),
                                0,
                            )
                        }
                    />
                    <Tooltip formatter={tooltipFormatter} />
                    <Bar
                        className='cursor-pointer'
                        dataKey='dateRangeNum'
                        fill='color'
                    >
                        {skillData.map(({ color, skillName }, i) => (
                            <Cell
                                className='hover:opacity-80'
                                key={i}
                                fill={color}
                                onClick={() => {
                                    const url = `/skill/${skillName}`
                                    navigate(url)
                                }}
                            ></Cell>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
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
