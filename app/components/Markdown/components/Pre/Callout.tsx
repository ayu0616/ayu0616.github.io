import jsYaml from 'js-yaml'

import { z } from 'zod'
import Markdown from '../../Markdown'

export interface CalloutProps {
    children: string
}

const calloutConfigSchema = z.object({
    title: z.string(),
    icon: z.string(),
})

export const Callout: React.FC<CalloutProps> = ({ children }) => {
    let ymlText = ''
    let content = ''
    let isYml = false
    children.split('\n').forEach((line) => {
        if (line.match(/^-+$/)) {
            isYml = !isYml
        } else if (isYml) {
            ymlText += `${line}\n`
        } else {
            content += `${line}\n`
        }
    })
    let { data: config, success } = calloutConfigSchema.safeParse(
        jsYaml.load(ymlText),
    )
    if (!(success && config)) {
        console.error('Invalid callout config', { config, ymlText })
        content = [
            'Invalid callout config',
            `\`${JSON.stringify(config)}\``,
        ].join('\n')
        config = { icon: '🚨', title: 'Invalid Callout' }
    }
    content = content.trim()
    return (
        <div className="flex gap-4 rounded-md border p-4">
            <p>{config.icon}</p>
            <div>
                <Markdown className="font-bold">{config.title}</Markdown>
                {content && (
                    <div className="mt-2">
                        <Markdown>{content}</Markdown>
                    </div>
                )}
            </div>
        </div>
    )
}
