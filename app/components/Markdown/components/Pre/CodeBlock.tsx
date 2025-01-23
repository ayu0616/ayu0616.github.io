'use client'

import { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeBlockProps {
    children?: string
    language?: string
}

// TODO: https://github.com/shikijs/shiki
const CodeBlock: React.FC<CodeBlockProps> = ({ language, children = '' }) => {
    const [buttonText, setButtonText] = useState(language ?? 'text')
    const timeoutId = useRef<number | null>(null)

    const handleCopy = async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(children)
        } else {
            alert(
                `開発環境ではnavigator.clipboardが使用できないためかわりに表示\ncopied: ${children}`,
            )
        }
        setButtonText('copied')
        timeoutId.current = window.setTimeout(
            () => setButtonText(language ?? 'text'),
            2000,
        )
    }
    return (
        <div className="relative w-full overflow-x-auto rounded-md drop-shadow-md">
            <button
                type="button"
                className="absolute top-0 right-0 rounded-tr-md rounded-bl-md bg-white px-2 py-1 text-sm hover:bg-slate-100"
                onClick={handleCopy}
            >
                <code>{buttonText}</code>
            </button>
            {/* @ts-ignore */}
            <SyntaxHighlighter
                showLineNumbers={true}
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
