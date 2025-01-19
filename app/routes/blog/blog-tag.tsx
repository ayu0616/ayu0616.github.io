import dayjs from 'dayjs'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router'
import { useLoaderData } from 'react-router'
import { BlogPageCard } from '~/components/BlogPageCard'
import { type BlogPageInfoItem, blogPageInfo } from '~/constant/blog-page-info'

interface Params {
    tag: string
}

interface LoaderData {
    pageList: PageListItem[]
    decodedTag: string
}

interface PageListItem extends Omit<BlogPageInfoItem, 'publishedAt'> {
    slug: string
    publishedAt: Date
}

const getPageListByTag = (tag: string): PageListItem[] => {
    return Object.keys(blogPageInfo)
        .map((slug) => blogPageInfo[slug])
        .filter((page) => page.tags.includes(tag))
        .sort((a, b) => b.publishedAt.diff(a.publishedAt))
        .map((page) => ({ ...page, publishedAt: page.publishedAt.toDate() }))
}

export const loader = async ({
    params,
}: { params: Params }): Promise<LoaderData> => {
    const { tag } = params
    const decodedTag = decodeURI(tag)
    const pageList = getPageListByTag(decodedTag)
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
                            publishedAt={dayjs(page.publishedAt)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
