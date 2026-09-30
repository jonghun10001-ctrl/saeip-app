import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-primary-soft text-primary',
  ghost: 'bg-transparent text-muted border border-line',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  full?: boolean
}

export default function Button({ variant = 'primary', full = false, className = '', ...rest }: Props) {
  return (
    <button
      className={`rounded-button px-4 py-3 text-base font-semibold disabled:opacity-40 ${VARIANTS[variant]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    />
  )
}
