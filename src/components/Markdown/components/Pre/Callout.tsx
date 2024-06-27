export interface CalloutProps {
    children: string
}

export const Callout: React.FC<CalloutProps> = ({ children }) => {
    return <div className='callout'>{children}</div>
}
