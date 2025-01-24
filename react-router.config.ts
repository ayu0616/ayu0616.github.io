import type { Config } from '@react-router/dev/config'
import skillData from './app/constant/skillData'
import { works } from './app/constant/works'
import { getBlogPageInfo } from './server/api/blog'

const ignorePrefixes = ['/atcoder', '/blog']

export default {
    // Config options...
    // Server-side render by default, to enable SPA mode set this to `false`
    ssr: true,

    async prerender({ getStaticPaths }) {
        const res = getStaticPaths()
        return res
            .filter(
                (path) =>
                    !ignorePrefixes.some((prefix) => path.startsWith(prefix)),
            )
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
    },
} satisfies Config
