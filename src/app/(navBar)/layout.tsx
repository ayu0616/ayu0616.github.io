import NavBar from '@/components/Layout/NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-dvh flex-col'>
            <NavBar />
            <div className='flex-1 overflow-y-auto scroll-smooth'>
                {children}
            </div>
        </div>
    )
}
