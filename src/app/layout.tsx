import { GoogleAnalytics } from '@next/third-parties/google'

import Icon from '@/../public/icon.webp'

import type { Metadata } from 'next'

import './index.scss'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    description: 'はっさくゼリー製造工場のポートフォリオサイト',
    icons: [{ url: Icon.src }],
    title: 'はっさくゼリー製造工場',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ja'>
            <head>
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
            </head>
            <body>{children}</body>
        </html>
    )
}
