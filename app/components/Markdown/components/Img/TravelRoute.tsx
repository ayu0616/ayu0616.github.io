import type {
    TravelRouteItem as TravelRouteItemType,
    TravelRoute as TravelRouteType,
} from 'app/__generated__/types/travel-route'
import { cn } from 'app/lib/utils'
import dayjs from 'dayjs'
import { Bed, Binoculars, Dot, Train, Utensils } from 'lucide-react'
import { Fragment } from 'react'

export interface TravelRouteProps {
    travelRoute: TravelRouteType
}

export const TravelRoute: React.FC<TravelRouteProps> = ({ travelRoute }) => {
    return (
        <div className="rounded-md border p-4">
            <table className="h-0">
                <tbody>
                    {travelRoute.items.map((item, index) => (
                        <Fragment key={item.name}>
                            <TravelRouteItemComponent
                                item={item}
                                isStart={index === 0}
                                isEnd={index === travelRoute.items.length - 1}
                            />
                            {index !== travelRoute.items.length - 1 && (
                                <tr>
                                    <td className="text-gray-700 text-sm">
                                        {item.time.to && (
                                            <div>
                                                {dayjs(item.time.to).format(
                                                    'HH:mm',
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td />
                                    <td />
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface TravelRouteItemProps {
    item: TravelRouteItemType
    isStart: boolean
    isEnd: boolean
}

const iconClassName = (type: TravelRouteItemType['type']) => {
    switch (type) {
        case 'moving':
            return 'bg-blue-100 border-blue-600 text-blue-600'
        case 'sightseeing':
            return 'bg-green-100 border-green-600 text-green-600'
        case 'eating':
            return 'bg-yellow-100 border-yellow-600 text-yellow-600'
        case 'staying':
            return 'bg-purple-100 border-purple-600 text-purple-600'
        case 'other':
            return 'bg-gray-100 border-gray-600 text-gray-600'
        default:
            throw new Error(`アイコンを設定してください。type: ${type}`)
    }
}

const TravelRouteItemComponent: React.FC<TravelRouteItemProps> = ({
    item,
    isStart,
    isEnd,
}) => {
    return (
        <tr>
            <td className="flex h-full justify-center py-2">
                {!(isStart || isEnd) && (
                    <div className="h-full w-px border-gray-400 border-x" />
                )}
            </td>
            <td>
                <div
                    className={cn(
                        'flex size-10 items-center justify-center rounded-full border-2',
                        iconClassName(item.type),
                    )}
                >
                    <TravelRouteIcon type={item.type} />
                </div>
            </td>
            <td className="pl-2">{item.name}</td>
        </tr>
    )
}

interface TravelRouteIconProps {
    type: TravelRouteItemType['type']
}

const TravelRouteIcon: React.FC<TravelRouteIconProps> = ({ type }) => {
    const className = 'size-6'
    switch (type) {
        case 'moving':
            return <Train className={className} />
        case 'sightseeing':
            return <Binoculars className={className} />
        case 'eating':
            return <Utensils className={className} />
        case 'staying':
            return <Bed className={className} />
        case 'other':
            return <Dot className={className} />
        default:
            throw new Error(`アイコンを設定してください。type: ${type}`)
    }
}
