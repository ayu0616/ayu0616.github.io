import dayjs from 'dayjs'
import type { ReactNode } from 'react'
import { useLoaderData } from 'react-router'
import type { z } from 'zod'
import { AtCoderChart } from '~/components/AtCoderChart'
import { type AtCoderResultSchema, getAtCoderResult } from '~/lib/atcoder'
import type { Route } from './+types/atcoder'

export const meta = ({ params }: Route.MetaArgs) => {
    return [
        { title: 'AtCoderの取り組み' },
        {
            name: 'description',
            content: 'AtCoderの取り組みをグラフで表示します。',
        },
    ]
}

export const loader = async () => {
    return await getAtCoderResult()
}

export default async function AtCoderPage() {
    const data = useLoaderData<z.infer<typeof AtCoderResultSchema>>()
    const tableData = [
        ['参加回数', data.length],
        ['現在のレーティング', data[data.length - 1].NewRating],
        ['最高レーティング', Math.max(...data.map((d) => d.NewRating))],
        [
            '平均パフォーマンス（直近4回）',
            Math.round(
                data.slice(-4).reduce((acc, d) => acc + d.Performance, 0) / 4,
            ),
        ],
        [
            '平均パフォーマンス（直近8回）',
            Math.round(
                data.slice(-8).reduce((acc, d) => acc + d.Performance, 0) / 8,
            ),
        ],
    ] satisfies [ReactNode, ReactNode][]
    return (
        <div className="mx-auto max-w-screen-sm px-4 py-8">
            <h1 className="mb-8 font-bold text-2xl">AtCoderの取り組み</h1>
            <div>
                <p className="mb-1 font-bold">集計</p>
                <div className="pl-4">
                    <table className="mb-8">
                        <tbody>
                            {tableData.map(([key, value]) => (
                                <tr key={key}>
                                    <td className="">{key}</td>
                                    <td className="pl-4">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mb-4 rounded-md border bg-white p-4">
                <AtCoderChart data={data} />
            </div>
            <div className="text-gray-700 text-sm">
                <p>最終更新日時: {dayjs().format('YYYY-MM-DD HH:mm')}</p>
                <p>
                    AtCoderプロフィール：{' '}
                    <a
                        href="https://atcoder.jp/users/ayu0616"
                        className="text-blue-600 underline underline-offset-2"
                    >
                        https://atcoder.jp/users/ayu0616
                    </a>
                </p>
            </div>
        </div>
    )
}
