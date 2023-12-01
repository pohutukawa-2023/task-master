import { HtmlHTMLAttributes } from 'react'

type Props = HtmlHTMLAttributes<HTMLDivElement>

function Logo({ children, ...rest }: Props) {
  return (
    <div
      className={
        'flex flex-row justify-center items-center bg-gradient-to-r from-lightPurple to-darkPurple  rounded-full text-black text-sm w-16 h-16'
      }
      {...rest}
    >
      {children}
    </div>
  )
}

export default Logo
