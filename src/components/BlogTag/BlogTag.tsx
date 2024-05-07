import Link from 'next/link'

export interface BlogTagProps {
    tag: string
}

const BlogTag: React.FC<BlogTagProps> = ({ tag }) => {
    return (
        <Link href={`/blog/tag/${tag}`}>
            <span className='rounded-sm bg-emerald-50 p-1 text-sm text-emerald-800 underline-offset-2 hover:underline'>
                #{tag}
            </span>
        </Link>
    )
}

export default BlogTag
