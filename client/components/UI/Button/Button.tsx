import { HtmlHTMLAttributes } from 'react'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

function Button({ children }: ButtonProps) {
  return (
    <button
      className={
        'bg-darkPurple text-darkNavy font-bold py-2 px-8 rounded-full ring-darkPurple hover:shadow-md'
      }
    >
      {children}
    </button>
  )
}

export default Button
