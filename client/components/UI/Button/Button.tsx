import { HtmlHTMLAttributes } from 'react'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-name</Button> 
*/

function Button({ children }: ButtonProps) {
  return (
    <button
      className={
        'bg-lightPurple text-darkNavy font-bold py-2 px-8 rounded-full hover:bg-darkPurple hover:text-primary'
      }
    >
      {children}
    </button>
  )
}

export default Button
