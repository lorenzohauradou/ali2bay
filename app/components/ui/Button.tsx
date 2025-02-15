import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  href?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  href,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center gap-2 font-medium
    transition-colors rounded-lg
    disabled:opacity-50 disabled:cursor-not-allowed
    group
  `

  const variants = {
    primary: 'bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90',
    secondary: 'bg-[#0066CC] text-white hover:bg-[#0066CC]/90',
    outline: 'border border-gray-200 text-gray-600 hover:bg-gray-50/80'
  }

  const iconStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-gray-600 group-hover:text-[#0066CC] transition-colors'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }

  const styles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full justify-center' : ''}
    ${className}
  `

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className={`
          ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}
          ${iconStyles[variant]}
        `} 
      />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`
          ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}
          ${iconStyles[variant]}
        `} 
      />
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    )
  }

  return (
    <button className={styles} {...props}>
      {content}
    </button>
  )
}