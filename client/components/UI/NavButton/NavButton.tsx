import { HtmlHTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-img</Button> 
*/

function NavButton({ link, children, ...rest }: ButtonProps) {
  return (
    <>
      <NavLink
        to={link}
        style={({ isActive }) => {
          return {
            background: isActive ? '#7743DB' : '#a6a6a6',
          }
        }}
        className={`rounded-full bg-grey`}
      >
        <button
          className={
            'bg-transparent text-black px-4 font-bold rounded-full focus:bg-darkPurple focus:shadow-[0px_0px_5px_2px_#0A0047] w-20 h-20'
          }
          {...rest}
        >
          {children}
        </button>
      </NavLink>
    </>
  )
}

export default NavButton
