import type { FC } from 'react'

export interface OriginalObjectProps {
    alt?: string
    filePath: string
}

export const OriginalObject: FC<OriginalObjectProps> = ({ alt, filePath }) => {
    return null
    // const jsonStr = fs.readFileSync(filePath, 'utf-8')
    // const jsonObj = JSON.parse(jsonStr)
    // if (!('type' in jsonObj)) {
    //     return null
    // }
    // if (jsonObj.type === 'travel-route') {
    //     const travelRoute = TravelRouteSchema.parse(jsonObj)
    //     return <TravelRoute travelRoute={travelRoute} />
    // }
    // throw new Error('Invalid type:', jsonObj.type)
}
