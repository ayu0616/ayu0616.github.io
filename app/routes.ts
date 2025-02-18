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

        route('work', 'routes/work/work.tsx'),
        route('work/:slug', 'routes/work/work-detail.tsx'),

        layout('routes/blog/blog-layout.tsx', [
            route('blog', 'routes/blog/blog.tsx'),
            route('blog/:slug', 'routes/blog/blog-detail.tsx'),
            route('blog/tag/:tag', 'routes/blog/blog-tag.tsx'),
        ]),

        route('ig-story-extend', 'routes/ig-story-extend/ig-story-extend.tsx'),
        route('ig-moment-story', 'routes/ig-moment-story/ig-moment-story.tsx'),
    ]),
] satisfies RouteConfig
