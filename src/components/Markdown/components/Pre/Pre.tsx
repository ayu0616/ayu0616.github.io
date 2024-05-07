import { ComponentProps, ComponentPropsWithoutRef } from 'react'

import CodeBlock from './Embed/CodeBlock'
import Embed from './Embed'
import TableOfContents from './TableOfContents'

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
        'props' in children ? children.props : {}
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
        default: {
            const code =
                'children' in childProps ? String(childProps.children) : ''
            return (
                <CodeBlock language={lang}>{code.replace(/\n$/, '')}</CodeBlock>
            )
        }
    }
}

export default Pre
