import { HtmlHTMLAttributes } from 'react'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-img</Button> 
*/

function NavButton({ children, ...rest }: ButtonProps) {
  return (
    <button
      className={
        'bg-slate-300 text-black font-bold py-4 px-4 rounded-full focus:bg-darkPurple focus:shadow-[0px_0px_5px_2px_#0A0047] w-20 h-20'
      }
      {...rest}
    >
      {children}
    </button>
  )
}

export default NavButton
