import type { Config } from '@react-router/dev/config'
import skillData from './app/constant/skillData'
import { works } from './app/constant/works'
import { getBlogPageInfo, getBlogTagList } from './server/api/blog'

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: true,

    async prerender({ getStaticPaths }) {
        const res = getStaticPaths()
        return res
            .filter((path) => !path.startsWith('/atcoder'))
            .concat(
                skillData
                    .filter((skill) => skill.id !== 'AtCoder')
                    .map((skill) => `/skill/${skill.id}`),
            )
            .concat(Object.keys(works).map((slug) => `/work/${slug}`))
            .concat(
                Object.keys(await getBlogPageInfo()).map(
                    (slug) => `/blog/${slug}`,
                ),
            )
            .concat((await getBlogTagList()).map((tag) => `/blog/tag/${tag}`))
    },
} satisfies Config
