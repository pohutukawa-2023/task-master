import { HtmlHTMLAttributes } from 'react'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-img</Button> 
*/

function NavButton({ onClick, children, ...rest }: ButtonProps) {
  return (
    <button
      className={
        'bg-slate-500 text-black font-bold py-2 px-2 rounded-lg focus:bg-black focus:shadow-[0px_0px_5px_2px_#000000]'
      }
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default NavButton
