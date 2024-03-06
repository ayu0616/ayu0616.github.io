import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.scss'
import { Index } from './pages'
import { Blog } from './pages/blog'
import { Skill } from './pages/skill'
import { SkillDetail } from './pages/skill/$skillName'
import { Work } from './pages/work'

library.add(fas)
library.add(fab)

const router = createBrowserRouter([
    {
        element: <Index />,
        path: '/',
    },
    {
        element: <Work />,
        path: '/work',
    },
    {
        element: <Skill />,
        path: '/skill',
    },
    {
        element: <SkillDetail />,
        path: '/skill/:skillName',
    },
    {
        element: <Blog />,
        path: 'blog',
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
