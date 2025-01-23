'use client'

import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { Loading } from 'app/components/common/loading'
import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

import './code.css'

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
    const { data: html } = useQuery({
        queryKey: ['codeToHtml', children, language],
        queryFn: () =>
            codeToHtml(children, {
                lang: language as BundledLanguage,
                theme: 'dark-plus',
            }),
    })

    if (!html) {
        return <Loading />
    }

    return (
        <div className="relative">
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <button
                type="button"
                className="absolute top-0 right-0 rounded-tr-md rounded-bl-md bg-white px-2 py-1 text-sm hover:bg-slate-100"
                onClick={handleCopy}
            >
                <code>{buttonText}</code>
            </button>
        </div>
    )
}

export default CodeBlock
