'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeBlockProps {
    children?: string
    language?: string
}

// TODO: https://github.com/shikijs/shiki
const CodeBlock: React.FC<CodeBlockProps> = ({ language, children = '' }) => {
    const [buttonText, setButtonText] = useState(language ?? 'text')
    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(children)
        } else {
            alert(
                `開発環境ではnavigator.clipboardが使用できないためかわりに表示\ncopied: ${children}`,
            )
        }
        setButtonText('copied')
        setTimeout(() => setButtonText(language ?? 'text'), 2000)
    }
    return (
        <div className='relative w-full overflow-x-auto rounded-md drop-shadow-md'>
            <button
                className='absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-white px-2 py-1 text-sm hover:bg-slate-100'
                onClick={handleCopy}
            >
                <code>{buttonText}</code>
            </button>
            <SyntaxHighlighter
                showLineNumbers
                customStyle={{
                    borderRadius: '0.375rem',
                    marginTop: 0,
                }}
                language={language}
                style={vscDarkPlus}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeBlock
