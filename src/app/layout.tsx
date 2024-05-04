import type { Metadata } from 'next'
import './index.scss'

export const metadata: Metadata = {
    description: 'はっさくゼリー製造工場のポートフォリオサイト',
    title: 'はっさくゼリー製造工場',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ja'>
            <body>{children}</body>
        </html>
    )
}
