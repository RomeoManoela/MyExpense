import React from 'react'

export interface ErrorType {
  message?: string
  data?: string
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}
