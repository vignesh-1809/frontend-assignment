import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import Typography from '../typography/Typography';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-md border p-4',
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

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Title of the alert */
  title?: string;
  /** Description of the alert */
  description?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Function to call when the alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon to override the default */
  icon?: React.ReactNode;
  /** Action buttons or links */
  action?: React.ReactNode;
}

/**
 * Alert component for displaying important messages
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      description,
      dismissible = false,
      onDismiss,
      icon,
      action,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        role="alert"
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon !== undefined ? icon : iconVariants[variant]}
          
          <div className="flex-1">
            {title && (
              <Typography variant="subtitle2" weight="medium">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" className={title ? 'mt-1' : undefined}>
                {description}
              </Typography>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
          
          {dismissible && (
            <button
              type="button"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200/50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;