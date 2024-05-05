import { ComponentProps } from 'react'

import TableOfContents from './TableOfContents'

const Code = ({ ...props }: ComponentProps<'code'>) => {
    const lang =
        props.className
            ?.split(' ')
            .find((cn) => cn.startsWith('language-'))
            ?.replace('language-', '') ?? ''
    switch (lang) {
        case 'table-of-contents':
            return <TableOfContents {...props} />
        default:
            return <code {...props} />
    }
}

export default Code
