import type { FC } from 'react'
import { cn } from '../../../lib/utils'

export const Clock: FC<{
    seconds: number
    className?: string
    disabled?: boolean
}> = ({ seconds, className, disabled = false }) => {
    const hour = Math.floor(seconds / 3600)
    const minute = Math.floor((seconds % 3600) / 60)
    const second = seconds % 60

    const hourDeg =
        ((hour * 3600 + minute * 60 + second) / (12 * 60 * 60)) * 360
    const minuteDeg = ((minute * 60 + second) / 3600) * 360
    const secondDeg = (second / 60) * 360
    return (
        <div
            className={cn(
                'relative aspect-square rounded-full border',
                className,
            )}
        >
            <div
                className="absolute flex size-full flex-col items-center"
                style={{
                    transform: `rotate(${hourDeg}deg)`,
                }}
            >
                {/* heightの値は合計で1/2になるようにしている */}
                <div className="h-1/6 w-0" />
                <div className="h-1/3 w-0 border border-gray-600" />
            </div>
            <div
                className="absolute flex size-full justify-center"
                style={{
                    transform: `rotate(${minuteDeg}deg)`,
                }}
            >
                <div className="h-1/2 w-0 border border-gray-600" />
            </div>
            <div
                className="absolute flex size-full justify-center"
                style={{
                    transform: `rotate(${secondDeg}deg)`,
                }}
            >
                <div className="h-1/2 w-0 border border-red-600" />
            </div>
            {disabled && (
                <div className="absolute inset-0 rounded-full bg-black/25" />
            )}
        </div>
    )
}
