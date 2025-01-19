import {
    type RouteConfig,
    index,
    layout,
    route,
} from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),

    layout('routes/layout.tsx', [
        route('atcoder', 'routes/atcoder.tsx'),

        route('skill', 'routes/skill.tsx'),
        route('skill/:id', 'routes/skill-detail.tsx'),

        route('work', 'routes/work.tsx'),
        route('work/:slug', 'routes/work-detail.tsx'),
    ]),
] satisfies RouteConfig
