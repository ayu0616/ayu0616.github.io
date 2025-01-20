import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fileDir = __dirname
const schemaPathList = fs.globSync(
    path.join(fileDir, '../../blog-contents/schema/*.json'),
)

schemaPathList.forEach((schemaPath) => {
    const name = path.basename(schemaPath, path.extname(schemaPath))
    const tsPath = path.join(fileDir, '../__generated__/types', `${name}.ts`)
    exec(
        [
            'bun quicktype',
            schemaPath,
            '-o',
            tsPath,
            '--src-lang schema --lang typescript-zod',
        ].join(' '),
    )
        .on('exit', () => {})
        .on('error', (err) => {})
})
