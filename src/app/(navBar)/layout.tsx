import NavBar from '@/components/Layout/NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-dvh flex-col'>
            <NavBar />
            <div className='flex-1 scroll-smooth'>{children}</div>
        </div>
    )
}
