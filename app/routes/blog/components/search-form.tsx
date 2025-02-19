import { XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router'
import { useDebounce } from '~/hooks/debounce'

interface SearchFormProps {
    searchQuery: string
}

export function SearchForm({ searchQuery }: SearchFormProps) {
    const [query, setQuery] = useState(searchQuery)
    const formRef = useRef<HTMLFormElement>(null)

    const debounce = useDebounce({
        callback: () => {
            formRef.current?.requestSubmit()
        },
        delay: 500,
    })

    useEffect(() => {
        setQuery(searchQuery)
    }, [searchQuery])

    return (
        <Form ref={formRef} className="mb-8 w-full">
            <label className="block cursor-pointer space-y-1">
                <span className="inline-block text-muted-foreground text-sm">
                    記事のタイトルで検索
                </span>
                <div className="flex gap-2">
                    <input
                        type="search"
                        name="q"
                        aria-label="記事検索"
                        placeholder="記事を検索..."
                        className="w-full flex-1 rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-primary"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            debounce()
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            aria-label="検索をリセット"
                            className="rounded-lg border bg-background p-2 transition-colors hover:bg-accent"
                            onClick={() => {
                                setQuery('')
                                formRef.current?.requestSubmit()
                            }}
                        >
                            <XIcon size={20} />
                        </button>
                    )}
                </div>
            </label>
        </Form>
    )
}
