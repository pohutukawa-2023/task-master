import { HtmlHTMLAttributes } from 'react'

type Props = HtmlHTMLAttributes<HTMLDivElement>

// bg-gradient-to-r from-lightPurple to-darkPurple

function Logo({ children, ...rest }: Props) {
  return (
    <>
      {/* <Link to="/"> */}
      <div
        className={
          'flex flex-row justify-center items-center rounded-full text-sm w-24 h-24'
        }
        {...rest}
      >
        {children}
      </div>
      {/* </Link> */}
    </>
  )
}

export default Logo
