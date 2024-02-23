export interface ButtonProps {
    children?: React.ReactNode
}

export const Button = ({ children }: ButtonProps) => {
    return <button className='shadow-md'>{children}</button>
}
