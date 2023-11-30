import { HtmlHTMLAttributes } from 'react'

type Props = HtmlHTMLAttributes<HTMLDivElement>

function Logo({ children, ...rest }: Props) {
  return (
    <div
      className={
        'flex flex-col justify-center bg-extraLightPurple rounded-full text-black text-xs w-6 h-6'
      }
      {...rest}
    >
      {children}
    </div>
  )
}

export default Logo
