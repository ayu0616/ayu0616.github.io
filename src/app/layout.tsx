import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import type { Metadata } from 'next'
import './index.scss'

library.add(fas)
library.add(fab)

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
