import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import Pre from './components/Pre/Pre'

export interface MarkdownProps {
    children?: string
    className?: string
    id?: string
    slug?: string
}

export const BLOG_CONTENT_ID = 'blog-content'

const Markdown: React.FC<MarkdownProps> = ({
    children = '',
    id,
    className = '',
    slug,
}) => {
    return (
        <div className={['grid gap-8', className].join(' ')} id={id}>
            <ReactMarkdown
                components={{
                    a: ({ children, href }) => (
                        <Link
                            className='block text-emerald-800 underline decoration-1 underline-offset-1'
                            href={href ?? '#'}
                            rel={
                                href?.startsWith('http')
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            target={
                                href?.startsWith('http') ? '_blank' : undefined
                            }
                        >
                            {children}
                        </Link>
                    ),

                    h1: (props) => (
                        <h1 {...props} id={props.children?.toString()}></h1>
                    ),
                    h2: (props) => (
                        <h2 {...props} id={props.children?.toString()}></h2>
                    ),
                    h3: (props) => (
                        <h3 {...props} id={props.children?.toString()}></h3>
                    ),
                    h4: (props) => (
                        <h4 {...props} id={props.children?.toString()}></h4>
                    ),
                    h5: (props) => (
                        <h5 {...props} id={props.children?.toString()}></h5>
                    ),
                    h6: (props) => (
                        <h6 {...props} id={props.children?.toString()}></h6>
                    ),
                    // code: Code,
                    li: ({ children }) => (
                        <li className='flex'>
                            <div>{children}</div>
                        </li>
                    ),
                    pre: (props) => <Pre {...props} slug={slug}></Pre>,
                }}
                remarkPlugins={[remarkGfm, remarkBreaks]}
            >
                {children}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown
