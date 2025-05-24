import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import Typography from '../typography/Typography';
import { Eye, EyeOff, X } from 'lucide-react';

const inputVariants = cva(
  'w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-600 dark:focus:border-primary-400',
        error:
          'border-error-500 text-error-900 placeholder:text-error-400 focus:border-error-500 focus:ring-error-500/40 dark:border-error-500 dark:focus:border-error-400',
      },
      size: {
        sm: 'h-8 text-xs px-2 py-1',
        md: 'h-10',
        lg: 'h-12 text-base px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const iconButtonClass = 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label for the input */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Icon to display on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Whether the input can be cleared with a button */
  clearable?: boolean;
  /** Function to call when the clear button is clicked */
  onClear?: () => void;
  /** Optional wrapper class name */
  wrapperClassName?: string;
}

/**
 * TextInput component for forms
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      wrapperClassName,
      variant,
      size,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      type = 'text',
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    
    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className={cn('space-y-1.5', wrapperClassName)}>
        {label && (
          <Typography
            as="label"
            variant="caption"
            weight="medium"
            htmlFor={props.id}
            className="block"
          >
            {label}
          </Typography>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: error ? 'error' : variant, size }),
              leftIcon && 'pl-10',
              (rightIcon || isPassword || (clearable && value)) && 'pr-10',
              className
            )}
            ref={ref}
            disabled={disabled}
            value={value}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={
              props.id ? `${props.id}-helper ${props.id}-error` : undefined
            }
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className={iconButtonClass}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
          {clearable && value && !isPassword && !rightIcon && (
            <button
              type="button"
              aria-label="Clear input"
              className={iconButtonClass}
              onClick={handleClear}
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {rightIcon && !isPassword && !(clearable && value) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <Typography
            variant="helper"
            color={error ? 'error' : 'muted'}
            id={props.id ? `${props.id}-${error ? 'error' : 'helper'}` : undefined}
          >
            {error || helperText}
          </Typography>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;