import { HtmlHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Props = HtmlHTMLAttributes<HTMLDivElement>

// bg-gradient-to-r from-lightPurple to-darkPurple

function Logo({ children, ...rest }: Props) {
  return (
    <>
      <Link to="/profile">
        <div
          className={
            'flex flex-row justify-center items-center rounded-full text-sm w-20 h-20'
          }
          {...rest}
        >
          {children}
        </div>
      </Link>
    </>
  )
}

export default Logo
