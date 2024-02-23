export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => {
    return <button className={`${className} rounded-md`} {...props}></button>
}
