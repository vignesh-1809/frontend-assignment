import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names to combine
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}