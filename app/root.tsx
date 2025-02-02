import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
} from 'react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { Route } from './+types/root'
import app_css from './app.css?url'
import NotFound from './components/not-found'
import { BASE_URL } from './constant/others'
import stylesheet from './index.scss?url'
import { ogImageClient } from './lib/hono'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
    { rel: 'stylesheet', href: app_css },
    { rel: 'stylesheet', href: stylesheet },
]

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <head>
                <Meta />
                <Links />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content="はっさくゼリー製造工場" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={BASE_URL} />
                <meta
                    property="og:image"
                    content={ogImageClient['og-image'].$url().href}
                />
                <meta
                    property="og:site_name"
                    content="はっさくゼリー製造工場"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="はっさくゼリー製造工場" />
                <meta
                    name="twitter:image"
                    content={ogImageClient['og-image'].$url().href}
                />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                </QueryClientProvider>
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!'
    let details = 'An unexpected error occurred.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <NotFound />
        }
        message = 'Error'
        details = error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}
