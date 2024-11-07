import fs from 'node:fs'

import type { MetadataRoute } from 'next'

import { blogPageInfo, blogTagList } from '@/constant/blog-page-info'

type SitemapItem = MetadataRoute.Sitemap[number]

const BASE_URL = 'https://ayu0616.github.io'
const appDirName = 'src/app'
const pageFileName = 'page.tsx'

const createSitemapItem = (path: string): SitemapItem => {
    let urlPath = path.replace(
        new RegExp(`${appDirName}|/${pageFileName}`, 'g'),
        '',
    )
    urlPath = urlPath.replace(/\/\(.*\)/g, '')
    return {
        lastModified: fs.statSync(path).mtime,
        url: BASE_URL + urlPath,
    }
}

const getSitemap = (pathName: string, list: SitemapItem[]) => {
    const dirents = fs.readdirSync(pathName, { withFileTypes: true })
    for (const dirent of dirents) {
        if (dirent.name.startsWith('[') || dirent.name.startsWith('_')) {
            continue
        }
        const currentPath = `${pathName}/${dirent.name}`
        if (dirent.isDirectory()) {
            getSitemap(currentPath, list)
        }
        if (dirent.name === pageFileName) {
            list.push(createSitemapItem(currentPath))
        }
    }
    return list
}

export default function sitemap(): MetadataRoute.Sitemap {
    // 通常のページを追加
    const sitemap = getSitemap(appDirName, [])

    // ブログ記事のページを追加
    for (const slug of Object.keys(blogPageInfo)) {
        sitemap.push({
            lastModified: blogPageInfo[slug].modified.toDate(),
            url: `${BASE_URL}/blog/${slug}`,
        })
    }

    // ブログのタグページを追加
    for (const tag of blogTagList) {
        sitemap.push({
            lastModified: new Date(),
            url: `${BASE_URL}/blog/tag/${tag}`,
        })
    }
    return sitemap
}
