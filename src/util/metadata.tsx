import type { Metadata } from 'next'

import Icon from '@/../public/icon.webp'

export const SITE_NAME = 'はっさくゼリー製造工場'

/** ページのタイトルを作成 */
const generateTitle = (title: string) =>
    title ? `${title} | ${SITE_NAME}` : SITE_NAME

interface GetMetadataProps {
    description?: string
    title: string
    url: string
}

/** メタデータを作成 */
export const getMetadata = ({
    title,
    description,
    url,
}: GetMetadataProps): Metadata => ({
    description: description ?? 'はっさくゼリー製造工場のポートフォリオサイト',
    icons: [{ url: Icon.src }],
    openGraph: {
        description:
            description ?? 'はっさくゼリー製造工場のポートフォリオサイト',
        images: [{ url: '/og-image' }],
        siteName: SITE_NAME,
        title: generateTitle(title),
        type: 'website',
        url,
    },
    title: generateTitle(title),
    twitter: {
        card: 'summary_large_image',
        creator: '@hassaku_0616',
        creatorId: 'hassaku_0616',
        description:
            description ?? 'はっさくゼリー製造工場のポートフォリオサイト',
        images: [{ url: '/og-image' }],
        title: generateTitle(title),
    },
})
