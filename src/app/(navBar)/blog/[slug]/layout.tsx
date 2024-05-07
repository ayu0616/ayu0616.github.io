import Script from 'next/script'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}

            {/* 埋め込み用スクリプト */}
            <Script
                src='https://platform.twitter.com/widgets.js'
                strategy='lazyOnload'
            />
            <Script
                src='https://www.threads.net/embed.js'
                strategy='lazyOnload'
            />
        </>
    )
}
