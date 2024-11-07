import * as z from 'zod'

export const ItemTypeSchema = z.enum([
    'eating',
    'moving',
    'other',
    'sightseeing',
    'staying',
])
export type ItemType = z.infer<typeof ItemTypeSchema>

export const TravelRouteTypeSchema = z.enum(['travel-route'])
export type TravelRouteType = z.infer<typeof TravelRouteTypeSchema>

export const TimeSchema = z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
})
export type Time = z.infer<typeof TimeSchema>

export const TravelRouteItemSchema = z.object({
    name: z.string(),
    time: TimeSchema,
    type: ItemTypeSchema,
})
export type TravelRouteItem = z.infer<typeof TravelRouteItemSchema>

export const TravelRouteSchema = z.object({
    items: z.array(TravelRouteItemSchema),
    type: TravelRouteTypeSchema,
})
export type TravelRoute = z.infer<typeof TravelRouteSchema>
