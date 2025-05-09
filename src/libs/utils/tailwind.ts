import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names and merges Tailwind classes efficiently
 * @param inputs - Class names to combine
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a variant function for handling conditional classes
 * @param base - Base classes that are always applied
 * @param variants - Object containing variant classes
 * @returns Function that returns merged classes based on variant
 */
export function createVariant<T extends string>(base: string, variants: Record<T, string>) {
  return (variant: T, className?: string) => {
    return cn(base, variants[variant], className)
  }
}

/**
 * Creates a size variant function for handling conditional classes
 * @param base - Base classes that are always applied
 * @param sizes - Object containing size classes
 * @returns Function that returns merged classes based on size
 */
export function createSize<T extends string>(base: string, sizes: Record<T, string>) {
  return (size: T, className?: string) => {
    return cn(base, sizes[size], className)
  }
}

/**
 * Creates a boolean variant function for handling conditional classes
 * @param base - Base classes that are always applied
 * @param variants - Object containing boolean variant classes
 * @returns Function that returns merged classes based on boolean variants
 */
export function createBooleanVariant<T extends string>(base: string, variants: Record<T, string>) {
  return (props: Record<T, boolean>, className?: string) => {
    const activeVariants = Object.entries(props)
      .filter(([_, value]) => value)
      .map(([key]) => variants[key as T])
    return cn(base, ...activeVariants, className)
  }
}
