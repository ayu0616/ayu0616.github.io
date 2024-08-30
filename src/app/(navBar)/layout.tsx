import NavBar from '@/components/Layout/NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-full flex-col">
            <NavBar />
            <div className="flex-1">{children}</div>
        </div>
    )
}
