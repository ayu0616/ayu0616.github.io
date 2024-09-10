import fs from 'node:fs'
import { TravelRouteSchema } from '@/__generated__/types/travel-route'
import type { FC } from 'react'
import { TravelRoute } from './TravelRoute'

export interface OriginalObjectProps {
    alt?: string
    filePath: string
}

export const OriginalObject: FC<OriginalObjectProps> = async ({
    alt,
    filePath,
}) => {
    const jsonStr = fs.readFileSync(filePath, 'utf-8')
    const jsonObj = JSON.parse(jsonStr)
    if (!('type' in jsonObj)) {
        console.error('Invalid object')
        return null
    }
    if (jsonObj.type === 'travel-route') {
        const travelRoute = TravelRouteSchema.parse(jsonObj)
        return <TravelRoute travelRoute={travelRoute} />
    }
    throw new Error('Invalid type:', jsonObj.type)
}
