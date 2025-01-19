import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const fileDir = path.dirname(__filename)
const schemaPathList = fs.globSync(
    path.join(fileDir, '../../blog-contents/schema/*.json'),
)

schemaPathList.forEach((schemaPath) => {
    const name = path.basename(schemaPath, path.extname(schemaPath))
    const tsPath = path.join(fileDir, '../__generated__/types', `${name}.ts`)
    exec(
        [
            'pnpm quicktype',
            schemaPath,
            '-o',
            tsPath,
            '--src-lang schema --lang typescript-zod',
        ].join(' '),
    )
        .on('exit', () => {
            console.log(`Generated: ${name}`)
        })
        .on('error', (err) => {
            console.error(err)
        })
})
