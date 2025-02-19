'use client'

import type { WritableAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import type { ReactNode } from 'react'

export function AtomsHydrator({
    atomValues,
    children,
}: {
    atomValues: Iterable<
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        readonly [WritableAtom<unknown, [any], unknown>, unknown]
    >
    children: ReactNode
}) {
    useHydrateAtoms(new Map(atomValues))
    return children
}
