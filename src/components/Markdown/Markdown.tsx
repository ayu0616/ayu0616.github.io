import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface MarkdownProps {
    children?: string
}

const Markdown: React.FC<MarkdownProps> = ({ children = '' }) => {
    return (
        <ReactMarkdown components={{}} remarkPlugins={[remarkGfm]}>
            {children}
        </ReactMarkdown>
    )
}

export default Markdown
