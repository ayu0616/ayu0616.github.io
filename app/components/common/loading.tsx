import { Loader } from 'lucide-react'
import type { FC } from 'react'

export const Loading: FC<{ size?: number }> = ({ size = 24 }) => (
    <div className="flex size-full items-center justify-center">
        <Loader className="animate-spin" size={size} />
    </div>
)
