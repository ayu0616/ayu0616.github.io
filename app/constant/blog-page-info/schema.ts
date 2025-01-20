import { z } from 'zod'

const headingSchema = z.object({
    level: z.number(),
    title: z.string(),
})

const blogPageItemSchema = z.object({
    published: z.boolean(),
    publishedAt: z.string().nullable(),
    tags: z.array(z.string()),
    created: z.string(),
    modified: z.string(),
    title: z.string(),
    headings: z.array(headingSchema),
    slug: z.string(),
    dirname: z.string(),
})

export const blogPageInfoSchema = z.record(blogPageItemSchema)

export type BlogPageInfoItem = z.infer<typeof blogPageItemSchema>
