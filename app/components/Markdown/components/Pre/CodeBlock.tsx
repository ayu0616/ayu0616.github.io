'use client'

import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'
import { Loading } from '~/components/common/loading'

import './code.css'

export interface CodeBlockProps {
    children?: string
    language?: string
}

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
        <div className="min-w-0 drop-shadow-md">
            <div className="flex items-center justify-between overflow-hidden rounded-t-md border-x border-t bg-white">
                <div className="flex gap-1.5 pl-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <div className="size-3 rounded-full bg-green-500" />
                </div>
                <button
                    type="button"
                    className="border-l px-2 py-1 text-sm hover:bg-slate-100"
                    onClick={handleCopy}
                >
                    <code>{buttonText || 'copy'}</code>
                </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}

export default CodeBlock
