import Link from 'next/link'

export interface BlogTagProps {
    tag: string
}

const BlogTag: React.FC<BlogTagProps> = ({ tag }) => {
    return (
        <Link href={`/blog/tag/${tag}`}>
            <span className="inline-block rounded-sm bg-emerald-50 px-1 py-0.5 text-emerald-800 text-sm underline-offset-2 hover:underline">
                #{tag}
            </span>
        </Link>
    )
}

export default BlogTag
