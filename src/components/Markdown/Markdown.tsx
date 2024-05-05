import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

export interface MarkdownProps {
    children?: string
}

const Markdown: React.FC<MarkdownProps> = ({ children = '' }) => {
    return (
        <div className='grid gap-4'>
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
                    li: ({ children }) => (
                        <li className='flex'>
                            <div>{children}</div>
                        </li>
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
