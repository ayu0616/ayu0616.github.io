import NavBar from 'app/components/Layout/NavBar'
import NotFound from 'app/components/not-found'
import { Outlet, isRouteErrorResponse } from 'react-router'
import type { Route } from './+types/layout'

const LO = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-full flex-col">
            <NavBar />
            <div className="flex-1">{children}</div>
        </div>
    )
}

export default function Layout() {
    return (
        <LO>
            <Outlet />
        </LO>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!'
    let details = 'An unexpected error occurred.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <LO>
                    <NotFound />
                </LO>
            )
        }
        message = 'Error'
        details = error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <LO>
            <main className="container mx-auto p-4 pt-16">
                <h1>{message}</h1>
                <p>{details}</p>
                {stack && (
                    <pre className="w-full overflow-x-auto p-4">
                        <code>{stack}</code>
                    </pre>
                )}
            </main>
        </LO>
    )
}
