import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const useClock = () => {
    const [datetime, setDatetime] = useState(dayjs())
    useEffect(() => {
        const interval = setInterval(() => {
            setDatetime(dayjs())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return datetime
}
