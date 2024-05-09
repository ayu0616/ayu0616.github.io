import { GoogleAnalytics } from '@next/third-parties/google'

import Icon from '@/../public/icon.webp'
import { PAGE_TITLE } from '@/util/metadata'

import type { Metadata } from 'next'

import './index.scss'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    description: 'はっさくゼリー製造工場のポートフォリオサイト',
    icons: [{ url: Icon.src }],
    title: PAGE_TITLE,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ja'>
            <head>
                <GoogleAnalytics gaId='G-WB8DFKSGMP' />
            </head>
            <body>{children}</body>
        </html>
    )
}
