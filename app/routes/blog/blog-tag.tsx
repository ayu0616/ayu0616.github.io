import dayjs from 'dayjs'
import { cache } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router'
import { useLoaderData } from 'react-router'
import { BlogPageCard } from '~/components/BlogPageCard'
import type { BlogPageInfoItem } from '~/constant/blog-page-info/schema'
import { honoClient } from '~/lib/hono'

interface Params {
    tag: string
}

interface LoaderData {
    pageList: PageListItem[]
    decodedTag: string
}

interface PageListItem extends BlogPageInfoItem {
    slug: string
}

const getPageListByTag = cache(async (tag: string): Promise<PageListItem[]> => {
    const res = await honoClient.blog.$get()
    const blogPageInfo = await res.json()
    return Object.keys(blogPageInfo)
        .map((slug) => blogPageInfo[slug])
        .filter((page) => page.tags.includes(tag))
        .sort((a, b) => dayjs(b.publishedAt).diff(dayjs(a.publishedAt)))
})

export const loader = async ({
    params,
}: { params: Params }): Promise<LoaderData> => {
    const { tag } = params
    const decodedTag = decodeURI(tag)
    const pageList = await getPageListByTag(decodedTag)
    return { pageList, decodedTag }
}

export const meta = ({ params }: { params: Params }) => {
    const { tag } = params
    const decodedTag = decodeURI(tag)
    return [{ title: `タグ： ${decodedTag}` }]
}

export default function Page() {
    const { pageList, decodedTag } = useLoaderData<typeof loader>()
    return (
        <div className="p-4 md:p-6">
            <div className="mx-auto max-w-screen-lg">
                <Link to="/blog">
                    <div className="mb-8 flex items-center gap-2 text-emerald-800 underline-offset-2 hover:underline">
                        <FaArrowLeft />
                        <span>ブログ一覧に戻る</span>
                    </div>
                </Link>
                <h1 className="mb-8">タグ：{decodedTag}</h1>
                <div className="grid gap-4">
                    {pageList.map((page) => (
                        <BlogPageCard
                            key={page.slug}
                            {...page}
                            publishedAt={dayjs(page.publishedAt).format(
                                'YYYY-MM-DD',
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
