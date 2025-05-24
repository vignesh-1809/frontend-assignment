import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import Typography from '../typography/Typography';
import { ChevronDown, Check, X } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const dropdownVariants = cva(
  'flex items-center justify-between w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
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

export interface DropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof dropdownVariants> {
  /** Label for the dropdown */
  label?: string;
  /** Helper text to display below the dropdown */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Array of options for the dropdown */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Optional icon to display on the left */
  icon?: React.ReactNode;
  /** Whether the dropdown allows clearing the selection */
  clearable?: boolean;
  /** Function to call when the clear button is clicked */
  onClear?: () => void;
  /** Optional wrapper class name */
  wrapperClassName?: string;
}

/**
 * Dropdown component for selecting from a list of options
 */
const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      className,
      wrapperClassName,
      variant,
      size,
      label,
      helperText,
      error,
      placeholder = 'Select an option',
      options,
      value,
      onChange,
      icon,
      disabled,
      clearable = false,
      onClear,
      id,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listboxId = id ? `${id}-listbox` : 'dropdown-listbox';
    
    const selectedOption = options.find(option => option.value === value);
    
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange('');
      }
    };
    
    const handleSelect = (option: DropdownOption) => {
      if (!option.disabled && onChange) {
        onChange(option.value);
      }
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleSelect(options[focusedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case 'Tab':
          setIsOpen(false);
          break;
        default:
          break;
      }
    }, [isOpen, options, focusedIndex]);
    
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    // Handle keyboard navigation
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [isOpen, handleKeyDown]);
    
    // Reset focused index when opening dropdown
    useEffect(() => {
      if (isOpen) {
        const selectedIndex = options.findIndex(option => option.value === value);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }, [isOpen, options, value]);
    
    return (
      <div className={cn('relative space-y-1.5', wrapperClassName)} ref={dropdownRef}>
        {label && (
          <Typography
            as="label"
            variant="caption"
            weight="medium"
            id={id ? `${id}-label` : undefined}
            className="block"
          >
            {label}
          </Typography>
        )}
        <button
          ref={buttonRef}
          type="button"
          className={cn(
            dropdownVariants({ variant: error ? 'error' : variant, size }),
            icon && 'pl-10',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={id ? `${id}-label` : undefined}
          aria-controls={isOpen ? listboxId : undefined}
          aria-invalid={!!error}
          id={id}
          {...props}
        >
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {icon}
            </span>
          )}
          <span className={cn('block truncate text-left', !selectedOption && 'text-gray-500')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center">
            {clearable && value && (
              <button
                type="button"
                className="mr-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                onClick={handleClear}
                aria-label="Clear selection"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <ul
              className="max-h-60 overflow-auto py-1"
              role="listbox"
              id={listboxId}
              aria-labelledby={id ? `${id}-label` : undefined}
              tabIndex={-1}
            >
              {options.length > 0 ? (
                options.map((option, index) => (
                  <li
                    key={option.value}
                    className={cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4 text-sm',
                      option.value === value && 'bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100',
                      focusedIndex === index && 'bg-gray-100 dark:bg-gray-700',
                      option.disabled && 'cursor-not-allowed opacity-50',
                      !(option.value === value) && !option.disabled && 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                    role="option"
                    aria-selected={option.value === value}
                    aria-disabled={option.disabled}
                    onClick={() => !option.disabled && handleSelect(option)}
                    id={`${listboxId}-option-${index}`}
                  >
                    <span className="block truncate font-normal">
                      {option.label}
                    </span>
                    {option.value === value && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-400">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <li className="py-2 px-4 text-sm text-gray-500 dark:text-gray-400">
                  No options available
                </li>
              )}
            </ul>
          </div>
        )}
        
        {(helperText || error) && (
          <Typography
            variant="helper"
            color={error ? 'error' : 'muted'}
            id={id ? `${id}-${error ? 'error' : 'helper'}` : undefined}
          >
            {error || helperText}
          </Typography>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;