import { useCallback, useRef } from 'react'

type Props = {
    callback: () => void
    delay?: number
}

export const useDebounce = ({ callback, delay = 1_000 }: Props) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const debounce = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            callback()
        }, delay)
    }, [delay, callback])

    return debounce
}
