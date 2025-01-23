'use client'

import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import type { z } from 'zod'
import type { AtCoderResultSchema } from '~/lib/atcoder'
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from './ui/chart'

interface AtCoderChartProps {
    data: z.infer<typeof AtCoderResultSchema>
}

export const AtCoderChart: FC<AtCoderChartProps> = ({ data }) => {
    // ratedのものに限定
    data = data.filter((d) => d.IsRated)

    // パフォーマンスの移動平均を計算
    data = data.map((d, i, self) => {
        const target = self.slice(Math.max(0, i - 3), i + 1)
        const movingAvg =
            target.reduce((acc, cur) => acc + cur.Performance, 0) /
            target.length
        return { ...d, MovingAverage: movingAvg }
    })

    const chartConfig = {
        Performance: {
            label: 'パフォーマンス',
            color: 'hsl(var(--chart-1))',
        },
        NewRating: {
            label: 'レーティング',
            color: 'hsl(var(--chart-2))',
        },
        MovingAverage: {
            label: '移動平均（4回）',
            color: 'hsl(var(--chart-3))',
        },
    } satisfies ChartConfig
    const maxPerformance = Math.max(...data.map((d) => d.Performance))
    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data} margin={{ left: -16 }}>
                <CartesianGrid vertical={false} />
                <Line
                    type="monotone"
                    dataKey="Performance"
                    stroke="hsl(var(--chart-1))"
                    dot={false}
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="NewRating"
                    stroke="hsl(var(--chart-2))"
                    dot={false}
                />
                <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="MovingAverage"
                    stroke="hsl(var(--chart-3))"
                    strokeDasharray="3 3"
                    dot={false}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <XAxis fontSize={8} dataKey="EndTime" />
                <YAxis
                    domain={[0, Math.ceil(maxPerformance / 400) * 400]}
                    tickCount={Math.ceil(maxPerformance / 400) + 1}
                />
                <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
        </ChartContainer>
    )
}
