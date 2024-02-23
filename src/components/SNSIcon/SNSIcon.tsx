export interface SNSIconProps {
    children: React.ReactNode
    href: string
}

export const SNSIcon = ({ ...props }: SNSIconProps) => {
    return <a {...props}></a>
}
