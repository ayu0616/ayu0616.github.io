import jsYaml from 'js-yaml'

import Markdown from '../../Markdown'

export interface CalloutProps {
    children: string
}

export const Callout: React.FC<CalloutProps> = ({ children }) => {
    let ymlText = ''
    let content = ''
    let isYml = false
    console.log(children)
    children.split('\n').forEach((line) => {
        if (line.match(/^-+$/)) {
            isYml = !isYml
        } else if (isYml) {
            ymlText += `${line}\n`
        } else {
            content += `${line}\n`
        }
    })
    const config = jsYaml.load(ymlText)
    if (
        !(config instanceof Object) ||
        !('title' in config) ||
        typeof config.title !== 'string' ||
        !('icon' in config) ||
        typeof config.icon !== 'string'
    ) {
        throw new Error(`Invalid callout config: ${JSON.stringify(config)}`)
    }
    return (
        <div className='flex gap-4 rounded-md border p-4'>
            <p>{config.icon}</p>
            <div>
                <p className='mb-2 font-bold'>{config.title}</p>
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}
