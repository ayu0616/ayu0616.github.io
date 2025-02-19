import type React from 'react'
import { JsonLD } from '~/components/JsonLD/JsonLD'
import { Loading } from '~/components/common/loading'
import VideoGenerator from './VideoGenerator'

export const meta = () => {
    return [
        { title: 'Instagram 瞬間表示ストーリー作成ツール' },
        {
            name: 'description',
            content:
                'Instagramストーリー用の一瞬表示動画を生成 - 120fpsの超高フレームレートで1フレームの動画を生成。閲覧時に一瞬だけ表示されるストーリーを作成可能。生成した動画は即ダウンロードしてそのまま投稿可能！',
        },
    ]
}

const IgMomentStory: React.FC = () => {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-8">
                <header className="mb-12">
                    <h1 className="mb-2 flex flex-wrap justify-center font-bold text-3xl text-gray-900">
                        <span className="mr-2">Instagram</span>
                        <span>瞬間表示ストーリー</span>
                        <span>作成ツール</span>
                    </h1>
                    <p className="text-gray-600">
                        画像をアップロードして一瞬で消えるストーリー動画を生成（120fps・1フレーム）
                        <br />※ 生成された動画は0.008秒だけ表示されます
                        <br />※
                        アップロードされた画像はサーバーには送信されません
                    </p>
                </header>

                {typeof window !== 'undefined' ? (
                    <VideoGenerator />
                ) : (
                    <Loading />
                )}

                <JsonLD
                    id="web-application"
                    json={{
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Instagram 瞬間表示ストーリー作成ツール',
                        applicationCategory: 'Multimedia',
                        operatingSystem: 'Any',
                        browserRequirements: 'Requires WebAssembly support',
                        screenshot: 'https://www.hassaku0616.com/og-image',
                        featureList: [
                            '1フレームの動画作成',
                            'WebP/PNG/JPG画像対応',
                            '動画はダウンロード可能（MP4形式）',
                            'クライアントサイド処理（画像非送信）',
                            'リアルタイムプレビュー',
                        ],
                        softwareRequirements:
                            'Modern browsers (Chrome 90+, Firefox 89+, Safari 15+)',
                        processorRequirements: '64-bit architecture',
                    }}
                />
            </div>
        </main>
    )
}

export default IgMomentStory
