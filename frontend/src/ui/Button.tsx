import { ButtonProps } from '../utils/type.ts'
import React from 'react'

function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md bg-[#EBE5C2] px-6 py-3 font-bold text-stone-800 transition-colors hover:bg-[#B9B28A] ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
