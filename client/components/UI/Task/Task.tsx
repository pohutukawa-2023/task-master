import { HtmlHTMLAttributes } from 'react'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-name</Button> 
*/

function Task({ children }: ButtonProps) {
  return (
    <button
      className={
        'bg-lightPurple text-darkNavy font-bold py-2 px-8 rounded-xl hover:bg-darkPurple hover:text-primary focus:shadow-[0px_0px_5px_2px_#C3ACD0]'
      }
    >
      {children}
    </button>
  )
}

export default Task
