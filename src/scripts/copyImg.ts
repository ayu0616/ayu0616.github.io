import * as fs from 'fs'
import * as path from 'path'

const fileDir = path.dirname(__filename)
const imgPathList = fs
    .readdirSync(path.join(fileDir, '../../blog-contents/'), {
        withFileTypes: true,
    })
    .reduce(
        (acc, dirent) => {
            if (!dirent.isDirectory()) {
                return acc
            }
            const slug = dirent.name
            const assetsDirName = path.join(dirent.path, dirent.name, 'assets')
            if (!fs.existsSync(assetsDirName)) {
                return acc
            }
            const imgList = fs.readdirSync(assetsDirName)
            const imgDataList = imgList.map((img) => ({
                name: path.basename(img),
                slug,
            }))
            return [...acc, ...imgDataList]
        },
        [] as { name: string; slug: string }[],
    )

imgPathList.forEach(({ name, slug }) => {
    const imgPath = path.join(fileDir, '../../public/blog-image', slug, name)
    if (!fs.existsSync(imgPath)) {
        fs.mkdirSync(path.dirname(imgPath), { recursive: true })
        fs.copyFileSync(
            path.join(fileDir, `../../blog-contents/${slug}/assets/${name}`),
            imgPath,
        )
        console.log(`Copied: ${imgPath}`)
    }
})
