import React, { useState, useEffect, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import Typography from '../typography/Typography';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const toastVariants = cva(
  'pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 shadow-md transition-all',
  {
    variants: {
      variant: {
        info: 'border-primary-200 bg-primary-50 text-primary-900 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-100',
        success: 'border-success-200 bg-success-50 text-success-900 dark:border-success-800 dark:bg-success-950 dark:text-success-100',
        warning: 'border-warning-200 bg-warning-50 text-warning-900 dark:border-warning-800 dark:bg-warning-950 dark:text-warning-100',
        error: 'border-error-200 bg-error-50 text-error-900 dark:border-error-800 dark:bg-error-950 dark:text-error-100',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconVariants = {
  info: <Info className="h-5 w-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />,
  success: <CheckCircle className="h-5 w-5 text-success-500 dark:text-success-400" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 text-warning-500 dark:text-warning-400" aria-hidden="true" />,
  error: <AlertCircle className="h-5 w-5 text-error-500 dark:text-error-400" aria-hidden="true" />,
};

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /** Title of the toast */
  title?: string;
  /** Description of the toast */
  description?: string;
  /** Whether the toast can be closed */
  closable?: boolean;
  /** Function to call when the toast is closed */
  onClose?: () => void;
  /** How long the toast should be displayed (in ms) before automatically closing */
  duration?: number;
  /** Whether the toast is visible */
  visible?: boolean;
  /** Custom icon to override the default */
  icon?: React.ReactNode;
  /** Action button */
  action?: React.ReactNode;
}

/**
 * Toast component for displaying temporary messages
 */
const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = 'info',
      title,
      description,
      closable = true,
      onClose,
      duration = 5000,
      visible = true,
      icon,
      action,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(visible);
    const [isLeaving, setIsLeaving] = useState(false);
    
    const handleClose = () => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, 300); // Match animation duration
    };
    
    // Auto-close after duration
    useEffect(() => {
      if (duration && isVisible && !isLeaving) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => {
          clearTimeout(timer);
        };
      }
    }, [duration, isVisible, isLeaving]);
    
    // Update visibility when prop changes
    useEffect(() => {
      setIsVisible(visible);
      if (visible) {
        setIsLeaving(false);
      }
    }, [visible]);
    
    if (!isVisible) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          isLeaving ? 'animate-fadeOut' : 'animate-fadeIn',
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon || iconVariants[variant]}
          
          <div className="flex-1">
            {title && (
              <Typography variant="subtitle2" weight="medium">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" className="mt-1">
                {description}
              </Typography>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pl-4">
          {action && <div>{action}</div>}
          
          {closable && (
            <button
              type="button"
              className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200/50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              onClick={handleClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;