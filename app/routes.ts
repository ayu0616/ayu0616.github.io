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
        route('japan-weekend-clock', 'routes/japan-weekend-clock.tsx'),

        route('skill', 'routes/skill.tsx'),
        route('skill/:id', 'routes/skill-detail.tsx'),

        route('work', 'routes/work.tsx'),
        route('work/:slug', 'routes/work-detail.tsx'),

        layout('routes/blog/blog-layout.tsx', [
            route('blog', 'routes/blog/blog.tsx'),
            route('blog/:slug', 'routes/blog/blog-detail.tsx'),
            route('blog/tag/:tag', 'routes/blog/blog-tag.tsx'),
        ]),
    ]),
] satisfies RouteConfig
