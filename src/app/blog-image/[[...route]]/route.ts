import fs from 'node:fs/promises'
import path from 'node:path'
import { type NextRequest, NextResponse } from 'next/server'

type Params = {
    route: string[]
}

const basedir = process.env.NODE_ENV === 'production' ? '/app' : process.cwd()

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    const { route } = params
    if (route.length !== 2) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }
    const [slug, filename] = route
    const globPath = path.join(
        basedir,
        'blog-contents',
        '**',
        slug,
        'assets',
        filename,
    )
    const imagePath = (await fs.glob(globPath).next()).value
    if (!imagePath) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }
    const buffer = await fs.readFile(imagePath)
    return new NextResponse(buffer)
}
