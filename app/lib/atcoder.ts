import dayjs from 'dayjs'
import { cache } from 'react'
import { z } from 'zod'

const ATCODER_RESULT_URL =
    'https://atcoder.jp/users/ayu0616/history/json?contestType=algo'

export const AtCoderResultSchema = z.array(
    z.object({
        IsRated: z.boolean(),
        Place: z.number().min(1),
        OldRating: z.number().min(0),
        NewRating: z.number().min(0),
        Performance: z.number().min(0),
        InnerPerformance: z.number().min(0),
        ContestScreenName: z.string(),
        ContestName: z.string(),
        ContestNameEn: z.string(),
        EndTime: z.coerce
            .date()
            .transform((date) => dayjs(date).format('YYYY-MM-DD')),
    }),
)

export const getAtCoderResult = cache(() =>
    fetch(ATCODER_RESULT_URL)
        .then((res) => res.json())
        .then(AtCoderResultSchema.parse),
)
