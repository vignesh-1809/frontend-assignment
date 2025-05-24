import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Define typography variants using CVA
const typographyVariants = cva('text-gray-900 dark:text-gray-100', {
  variants: {
    variant: {
      h1: 'text-5xl font-bold tracking-tight leading-tight',
      h2: 'text-4xl font-bold tracking-tight leading-tight',
      h3: 'text-3xl font-semibold tracking-tight leading-tight',
      h4: 'text-2xl font-semibold tracking-normal leading-snug',
      h5: 'text-xl font-semibold tracking-normal leading-snug',
      h6: 'text-lg font-medium tracking-normal leading-normal',
      subtitle1: 'text-lg font-medium tracking-normal leading-normal',
      subtitle2: 'text-base font-medium tracking-normal leading-normal',
      body1: 'text-base font-normal tracking-normal leading-relaxed',
      body2: 'text-sm font-normal tracking-normal leading-relaxed',
      caption: 'text-xs font-normal tracking-wide leading-normal',
      overline: 'text-xs font-medium tracking-widest leading-normal uppercase',
      helper: 'text-sm font-normal tracking-normal leading-normal text-gray-600 dark:text-gray-400',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: 'text-gray-900 dark:text-gray-100',
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      accent: 'text-accent-600 dark:text-accent-400',
      success: 'text-success-600 dark:text-success-400',
      warning: 'text-warning-600 dark:text-warning-400',
      error: 'text-error-600 dark:text-error-400',
      muted: 'text-gray-500 dark:text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'body1',
    align: 'left',
    color: 'default',
  },
});

// TypeScript interface for Typography props
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Typography component for consistent text styling across the application
 */
const Typography = ({
  as: Component = 'p',
  variant = 'body1',
  weight,
  align,
  color,
  truncate = false,
  className,
  children,
  ...props
}: TypographyProps) => {
  // Set the default HTML element based on the variant
  const element = Component || {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
    helper: 'span',
  }[variant] || 'p';

  const ElementType = element as keyof JSX.IntrinsicElements;

  return (
    <ElementType
      className={cn(
        typographyVariants({ variant, weight, align, color }),
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </ElementType>
  );
};

export default Typography;