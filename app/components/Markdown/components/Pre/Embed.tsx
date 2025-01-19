import yaml from 'js-yaml'

import YoutubeEmbed from './Embed/YoutubeEmbed'

export interface EmbedProps {
    optionStr: string
}

interface EmbedOptionSchemaValue {
    required: boolean
    type: ('string' | 'number')[]
}

const embedOptionSchema = {
    aspect: { required: false, type: ['string', 'number'] },
    height: { required: false, type: ['string', 'number'] },
    src: { required: true, type: ['string'] },
    width: { required: false, type: ['string', 'number'] },
} as const satisfies Record<string, EmbedOptionSchemaValue>

export type EmbedOption = {
    [key in keyof typeof embedOptionSchema]:
        | ((typeof embedOptionSchema)[key]['type'] extends ['string']
              ? string
              : (typeof embedOptionSchema)[key]['type'] extends [
                      'string',
                      'number',
                  ]
                ? number | string
                : never)
        | ((typeof embedOptionSchema)[key]['required'] extends true
              ? never
              : undefined)
}

const EmbedOptionIsValid = (option: unknown): option is EmbedOption => {
    if (typeof option !== 'object' || option === null) {
        throw new Error('Embed option must be an object')
    }

    const optionKeys = Object.keys(option)
    const schemaKeys = Object.keys(embedOptionSchema)
    const invalidKeys = optionKeys.filter(
        (key) => !schemaKeys.includes(key as keyof EmbedOption),
    )
    if (invalidKeys.length > 0) {
        throw new Error(`Invalid key: ${invalidKeys.join(', ')}`)
    }

    const missingKeys = Object.entries(embedOptionSchema).filter(
        ([key, val]) => val.required && !optionKeys.includes(key),
    )
    if (missingKeys.length > 0) {
        throw new Error(`Required key is missing: ${missingKeys.join(', ')}`)
    }

    /** 上までのチェックでkeyが正しいことは確認済み */
    const keyValidOption = option as Record<keyof EmbedOption, unknown>
    const invalidTypeKeys = (
        Object.entries(embedOptionSchema) as [
            keyof EmbedOption,
            EmbedOptionSchemaValue,
        ][]
    ).filter(([key, val]) => {
        if (!optionKeys.includes(key)) {
            return false
        }
        const value = keyValidOption[key]
        const typeofValue = typeof value
        if (typeofValue !== 'string' && typeofValue !== 'number') {
            return true
        }
        return !val.type.includes(typeofValue)
    })
    if (invalidTypeKeys.length > 0) {
        throw new Error(
            `Invalid type: ${invalidTypeKeys.map(([key]) => key).join(', ')}`,
        )
    }

    return true
}

const Embed = ({ optionStr, ...props }: EmbedProps) => {
    const option = yaml.load(optionStr)
    if (!EmbedOptionIsValid(option)) {
        throw new Error('Invalid embed option')
    }
    const url = new URL(option.src)

    if (['www.youtube.com', 'youtube.com', 'youtu.be'].includes(url.hostname)) {
        // YouTubeの埋め込み
        return <YoutubeEmbed option={option} />
    }

    const { aspect } = option
    return (
        <iframe
            {...option}
            className="border-none"
            style={{ aspectRatio: aspect }}
        />
    )
}

export default Embed
