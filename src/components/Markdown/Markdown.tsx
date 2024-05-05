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
                components={{}}
                remarkPlugins={[remarkGfm, remarkBreaks]}
            >
                {children}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown
