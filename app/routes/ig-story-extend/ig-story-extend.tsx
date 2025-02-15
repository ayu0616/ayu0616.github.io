import type React from 'react'
import { Loading } from '~/components/common/loading'
import VideoGenerator from './VideoGenerator'

export const meta = () => {
    return [
        { title: 'Instagram ストーリー時間設定ツール' },
        {
            name: 'description',
            content:
                'Instagramストーリー用の動画を簡単作成 - 画像アップロードで表示秒数を1〜60秒から自由調整（デフォルト15秒）。背景色カスタマイズ可能な動画生成ツール。生成した動画は即ダウンロードしてそのまま投稿可能！',
        },
    ]
}

const IgStoryExtend: React.FC = () => {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-8">
                <header className="mb-12">
                    <h1 className="mb-2 flex flex-wrap justify-center font-bold text-3xl text-gray-900">
                        <span className="mr-2">Instagram</span>
                        <span>ストーリー</span>
                        <span>時間設定ツール</span>
                    </h1>
                    <p className="text-gray-600">
                        画像をアップロードしてストーリーに表示される秒数を自由に設定
                        <br />
                        （デフォルト15秒・最短1秒〜最長60秒）
                        <br />※
                        アップロードされた画像はサーバーには送信されません。
                    </p>
                </header>

                {typeof window !== 'undefined' ? (
                    <VideoGenerator />
                ) : (
                    <Loading />
                )}
            </div>
        </main>
    )
}

export default IgStoryExtend
