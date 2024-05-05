import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import Code from './components/Code/Code'

export interface MarkdownProps {
    children?: string
    className?: string
    id?: string
}

export const BLOG_CONTENT_ID = 'blog-content'

const Markdown: React.FC<MarkdownProps> = ({
    children = '',
    id,
    className = '',
}) => {
    return (
        <div className={['grid gap-4', className].join(' ')} id={id}>
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
                    code: Code,
                    li: ({ children }) => (
                        <li className='flex'>
                            <div>{children}</div>
                        </li>
                    ),
                    pre: ({ children }) => (
                        <pre className='has-[#toc]:whitespace-nowrap'>
                            {children}
                        </pre>
                    ),
                }}
                remarkPlugins={[remarkGfm, remarkBreaks]}
            >
                {children}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown
