'use client'
import * as yaml from 'js-yaml'
import { useMemo } from 'react'
import type { FC } from 'react'
import { z } from 'zod'

const LinkSchema = z.object({
    url: z.string().url(),
    title: z.string(),
    description: z.string(),
    host: z.string(),
    favicon: z.string().url().optional(),
    image: z.string().url().optional(),
})

export const CardLink: FC<{ children: string }> = ({ children }) => {
    const parsedData = useMemo(() => {
        try {
            const data = yaml.load(children) as unknown
            return LinkSchema.parse(data)
        } catch {
            return null
        }
    }, [children])

    if (!parsedData) {
        return <div className="text-red-500">Invalid card link format</div>
    }

    return (
        <div className="rounded-md border transition-colors hover:bg-muted/50">
            <a
                href={parsedData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_2fr]"
            >
                {parsedData.image && (
                    <div className="">
                        <img
                            src={parsedData.image}
                            alt={parsedData.title}
                            className="h-full object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                )}
                <div className="flex flex-1 flex-col justify-between gap-2 p-4">
                    <p className="font-semibold">{parsedData.title}</p>
                    <p className="line-clamp-2 text-muted-foreground text-xs">
                        {parsedData.description}
                    </p>
                    <div className="flex items-center gap-2">
                        {parsedData.favicon && (
                            <img
                                src={parsedData.favicon}
                                alt="favicon"
                                className="h-4 w-4 rounded"
                                loading="lazy"
                            />
                        )}
                        <span className="line-clamp-1 text-muted-foreground text-sm">
                            {parsedData.host}
                        </span>
                    </div>
                </div>
            </a>
        </div>
    )
}
