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
            formRef.current?.dispatchEvent(
                new Event('submit', { bubbles: true }),
            )
        },
        delay: 500,
    })

    useEffect(() => {
        setQuery(searchQuery)
    }, [searchQuery])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        debounce()
    }

    return (
        <Form ref={formRef} className="mb-8 w-full">
            <label className="block cursor-pointer">
                <span className="mb-1 inline-block text-muted-foreground text-sm">
                    記事のタイトルで検索
                </span>
                <div className="flex gap-2">
                    <input
                        type="search"
                        name="q"
                        placeholder="記事を検索..."
                        className="w-full flex-1 rounded-lg border bg-white px-4 py-2"
                        value={query}
                        onChange={handleChange}
                    />
                    {query && (
                        <button
                            type="button"
                            aria-label="検索をリセット"
                            className="rounded-lg border bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                            onClick={() => {
                                setQuery('')
                                debounce()
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
