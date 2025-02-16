"use client"

import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  href?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
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
  onClick,
  disabled
}: ButtonProps) {
  const baseStyles = [
    'inline-flex items-center gap-2 font-medium',
    'transition-colors rounded-lg',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'group'
  ].join(' ')

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

  const styles = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full justify-center' : '',
    className
  ].filter(Boolean).join(' ')

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.90,
      transition: {
        duration: 0.1
      }
    }
  }

  const iconVariants = {
    hover: {
      rotate: iconPosition === 'right' ? 45 : -45,
      x: iconPosition === 'right' ? 3 : -3,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <motion.div variants={iconVariants}>
          <Icon className={`
            ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}
            ${iconStyles[variant]}
          `} />
        </motion.div>
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <motion.div variants={iconVariants}>
          <Icon className={`
            ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}
            ${iconStyles[variant]}
          `} />
        </motion.div>
      )}
    </>
  )

  if (href) {
    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Link href={href} className={styles}>
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button 
      className={styles}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  )
}