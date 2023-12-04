import { HtmlHTMLAttributes } from 'react'

type CheckboxProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-name</Button> 
*/

function Checkbox({ onClick, children, ...rest }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={` text-darkNavy py-2 px-6 rounded-full accent-darkPurple h-6 ${rest?.addclasses}`}
      {...rest}
    >
      {children}
    </input>
  )
}

export default Checkbox
