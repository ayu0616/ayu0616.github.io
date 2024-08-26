import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { BIZ_UDPGothic } from 'next/font/google'

import { getMetadata } from '@/util/metadata'

import './index.scss'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const dynamic = 'force-static'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export const metadata: Metadata = {
    ...getMetadata({
        title: '',
        url: 'https://ayu0616.github.io',
    }),
    metadataBase: new URL('https://ayu0616.github.io'),
}

const bizUDPGothic = BIZ_UDPGothic({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ja">
            <head>
                <GoogleAnalytics gaId="G-WB8DFKSGMP" />
            </head>
            <body className={bizUDPGothic.className}>{children}</body>
        </html>
    )
}
