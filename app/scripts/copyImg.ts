import * as fs from 'node:fs'
import * as path from 'node:path'

const fileDir = path.dirname(__filename)
const imgPathList = fs
    .globSync(path.join(fileDir, '../../blog-contents/**/assets/*.*'))
    .reduce(
        (acc, ph) => {
            const slug = /blog-contents(.*?)\/([^\/]+?)\/assets\/.+\..+/.exec(
                ph,
            )![2]
            return [...acc, { filePath: ph, name: path.basename(ph), slug }]
        },
        [] as { filePath: string; name: string; slug: string }[],
    )

imgPathList.forEach(({ name, slug, filePath }) => {
    const imgPath = path.join(fileDir, '../../public/blog-image', slug, name)
    if (!fs.existsSync(imgPath)) {
        fs.mkdirSync(path.dirname(imgPath), { recursive: true })
        fs.copyFileSync(filePath, imgPath)
        console.log(`Copied: ${imgPath}`)
    }
})
