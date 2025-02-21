import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

import { Callout } from './Callout'
import CodeBlock from './CodeBlock'
import Embed from './Embed'
import TableOfContents from './TableOfContents'
import { CardLink } from './card-link'

interface PreProps extends ComponentPropsWithoutRef<'pre'> {
    slug?: string
}

const Pre = ({ slug, ...props }: PreProps) => {
    const { children } = props
    if (!children || typeof children !== 'object') {
        return <>{props.children}</>
    }
    const childType = 'type' in children ? children.type : ''
    if (childType !== 'code') {
        return <>{props.children}</>
    }
    const childProps: ComponentProps<'code'> =
        'props' in children && children.props instanceof Object
            ? children.props
            : {}
    const lang =
        childProps.className
            ?.split(' ')
            .find((cn) => cn.startsWith('language-'))
            ?.replace('language-', '') ?? ''
    switch (lang) {
        case 'table-of-contents': {
            return <TableOfContents slug={slug} {...props} />
        }
        case 'embed': {
            const optionStr =
                'children' in childProps ? String(childProps.children) : ''
            return <Embed optionStr={optionStr} />
        }
        case 'callout':
            return <Callout>{String(childProps.children)}</Callout>
        case 'cardlink':
            return <CardLink>{String(childProps.children)}</CardLink>
        default: {
            const code =
                'children' in childProps ? String(childProps.children) : ''
            return <CodeBlock language={lang}>{code.trim()}</CodeBlock>
        }
    }
}

export default Pre
