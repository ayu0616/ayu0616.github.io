import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'

import 'katex/dist/katex.min.css'
import Blockquote from './components/Blockquote'
import { Img } from './components/Img/Img'
import Pre from './components/Pre/Pre'
import './style.css'

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
        <div className={cn('markdown space-y-8', className)} id={id}>
            <ReactMarkdown
                components={{
                    a: ({ className, children, href }) => (
                        <Link
                            className={cn(
                                'inline-block break-all text-emerald-800 underline decoration-1 underline-offset-1',
                                className,
                            )}
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
                    blockquote: (props) => <Blockquote {...props} />,
                    h1: ({ className, ...props }) => (
                        <h1
                            {...props}
                            className={cn(
                                'mt-8 first:mt-0 md:mt-14',
                                className,
                            )}
                            id={props.children?.toString()}
                        />
                    ),
                    h2: ({ className, ...props }) => (
                        <h2
                            {...props}
                            className={cn(
                                'mt-8 first:mt-0 md:mt-14',
                                className,
                            )}
                            id={props.children?.toString()}
                        />
                    ),
                    h3: ({ className, ...props }) => (
                        <h3
                            {...props}
                            className={cn(
                                'mt-8 first:mt-0 md:mt-14',
                                className,
                            )}
                            id={props.children?.toString()}
                        />
                    ),
                    h4: ({ className, ...props }) => (
                        <h4
                            {...props}
                            className={cn(
                                'mt-8 first:mt-0 md:mt-14',
                                className,
                            )}
                            id={props.children?.toString()}
                        />
                    ),
                    h5: ({ className, ...props }) => (
                        <h5
                            {...props}
                            className={cn(
                                'mt-8 first:mt-0 md:mt-14',
                                className,
                            )}
                            id={props.children?.toString()}
                        />
                    ),
                    h6: ({ className, ...props }) => (
                        <h6
                            {...props}
                            className={cn(
                                'mt-8 first:mt-0 md:mt-14',
                                className,
                            )}
                            id={props.children?.toString()}
                        />
                    ),
                    img: ({ alt, src }) => (
                        <Img
                            alt={alt}
                            slug={slug ?? ''} // TODO: slugがundefinedの場合の処理
                            src={src ?? ''} // TODO: srcがundefinedの場合の処理
                        />
                    ),
                    // code: Code,
                    li: ({ children }) => (
                        <li className="flex">
                            <div>{children}</div>
                        </li>
                    ),
                    ol: ({ className, ...props }) => (
                        <ol
                            className={cn('list-decimal', className)}
                            {...props}
                        />
                    ),
                    pre: (props) => <Pre {...props} slug={slug} />,
                    table: ({ className, ...props }) => (
                        <div className="relative w-full overflow-x-auto">
                            <table
                                className={cn(
                                    'min-w-full table-auto divide-y divide-gray-200',
                                    className,
                                )}
                                {...props}
                            />
                        </div>
                    ),
                    tbody: ({ className, ...props }) => (
                        <tbody
                            className={cn(
                                'divide-y divide-gray-200 bg-white',
                                className,
                            )}
                            {...props}
                        />
                    ),
                    td: ({ className, ...props }) => (
                        <td
                            className={cn(
                                'whitespace-nowrap px-2 py-2',
                                className,
                            )}
                            {...props}
                        />
                    ),
                    th: ({ className, ...props }) => (
                        <th
                            className={cn(
                                'whitespace-nowrap px-2 py-2 text-gray-500 tracking-wider',
                                className,
                            )}
                            {...props}
                        />
                    ),
                    thead: ({ className, ...props }) => (
                        <thead
                            className={cn('bg-gray-50', className)}
                            {...props}
                        />
                    ),
                }}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
            >
                {children}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown
