const withExportImages = require('next-export-optimize-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
}

module.exports = withExportImages(nextConfig)
