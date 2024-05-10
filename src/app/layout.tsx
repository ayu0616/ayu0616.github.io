import { GoogleAnalytics } from '@next/third-parties/google'

import { getMetadata } from '@/util/metadata'

import './index.scss'

export const dynamic = 'force-static'

export const metadata = getMetadata({
    title: '',
    url: 'https://ayu0616.github.io',
})

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
