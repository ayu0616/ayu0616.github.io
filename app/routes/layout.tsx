import { Outlet } from 'react-router'
import NavBar from '~/components/Layout/NavBar'

export default function Layout() {
    return (
        <div className="flex min-h-full flex-col">
            <NavBar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}
