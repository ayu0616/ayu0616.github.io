import { GoogleAnalytics } from '@next/third-parties/google'

import { SITE_NAME, getMetadata } from '@/util/metadata'

import './index.scss'

export const dynamic = 'force-static'

// export const metadata: Metadata = {
//     description: 'はっさくゼリー製造工場のポートフォリオサイト',
//     icons: [{ url: Icon.src }],
//     openGraph: {
//         description: 'はっさくゼリー製造工場のポートフォリオサイト',
//         // images: [{ url: Icon.src }],
//         siteName: SITE_NAME,
//         title: SITE_NAME,
//         type: 'website',
//         url: 'https://ayu0616.github.io',
//     },
//     title: SITE_NAME,
// }

export const metadata = getMetadata({
    title: SITE_NAME,
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
