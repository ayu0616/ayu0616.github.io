import { BASE_URL } from '@/constant/others'
import type {
    BreadcrumbList as BreadcrumbListSchema,
    WithContext,
} from 'schema-dts'
import { JsonLD } from '../JsonLD/JsonLD'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../ui/breadcrumb'

export interface BlogBreadcrumbProps {
    slug: string
    title: string
}

export const BlogBreadcrumb: React.FC<BlogBreadcrumbProps> = ({
    slug,
    title,
}) => {
    const json = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        name: 'パンくずリスト',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'ホーム',
                item: BASE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'ブログ',
                item: `${BASE_URL}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: title,
                item: `${BASE_URL}/blog/${slug}`,
            },
        ],
    } satisfies WithContext<BreadcrumbListSchema>
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <JsonLD json={json} id="breadcrumb-json-ld" />
        </>
    )
}
