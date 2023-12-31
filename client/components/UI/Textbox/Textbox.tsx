import { InputHTMLAttributes } from 'react'

type InputAttribues = InputHTMLAttributes<HTMLInputElement>

function TextBox({ className, ...rest }: InputAttribues) {
  return (
    <input
      type="text"
      className={`p-2 px-4 bg-lightPurple text-darkNavy border rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0] border-transparent placeholder-[#B07CF2] focus:outline-none block w-full sm:text-sm ${className}`}
      autoComplete="off"
      {...rest}
    />
  )
}

export default TextBox
