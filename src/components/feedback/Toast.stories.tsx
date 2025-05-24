import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import Toast from './Toast';
import Typography from '../typography/Typography';

/**
 * `Toast` provides temporary messages and notifications.
 * 
 * ## Features
 * - Multiple variants (info, success, warning, error)
 * - Configurable duration
 * - Customizable title and description
 * - Optional action button
 * - Auto-dismissal with smooth animations
 * 
 * ## Accessibility
 * - Proper ARIA attributes (role="alert", aria-live="polite")
 * - Close button is properly labeled
 * - Visible focus states for interactive elements
 * 
 * ## Usage Guidelines
 * - Use for non-critical, transient information
 * - Keep messages concise and clear
 * - Use appropriate variant for the message type
 * - Consider using ToastProvider for managing multiple toasts
 */
const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style variant of the toast',
    },
    title: {
      control: 'text',
      description: 'Title of the toast',
    },
    description: {
      control: 'text',
      description: 'Description of the toast',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the toast can be closed',
    },
    duration: {
      control: 'number',
      description: 'How long the toast should be displayed (in ms) before automatically closing',
    },
    visible: {
      control: 'boolean',
      description: 'Whether the toast is visible',
    },
    icon: {
      control: { disable: true },
      description: 'Custom icon to override the default',
    },
    action: {
      control: { disable: true },
      description: 'Action button',
    },
  },
  args: {
    title: 'Toast Title',
    description: 'This is a toast message providing some information.',
    closable: true,
    duration: 5000,
    visible: true,
  },
  parameters: {
    docs: {
      description: {
        component: 'A customizable toast component for displaying temporary messages and notifications.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Operation completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action might have consequences.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'An error occurred while processing your request.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    title: undefined,
    description: 'A simple toast message without a title.',
  },
};

export const WithAction: Story = {
  render: (args) => (
    <Toast
      {...args}
      action={
        <button className="rounded bg-primary-600 px-2 py-1 text-xs font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:bg-primary-700 dark:hover:bg-primary-600">
          Undo
        </button>
      }
    />
  ),
};

export const NonClosable: Story = {
  args: {
    closable: false,
    duration: 0, // Won't auto-close
  },
};

export const CustomDuration: Story = {
  args: {
    duration: 2000,
    description: 'This toast will disappear after 2 seconds.',
  },
};

export const ToastPlayground: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{
      id: number;
      variant: 'info' | 'success' | 'warning' | 'error';
      title: string;
      description: string;
      visible: boolean;
    }>>([]);
    
    const variants = ['info', 'success', 'warning', 'error'] as const;
    const [counter, setCounter] = useState(0);
    
    const addToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
      const titles = {
        info: 'Information',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
      };
      
      const descriptions = {
        info: 'This is an informational message.',
        success: 'Operation completed successfully.',
        warning: 'This action might have consequences.',
        error: 'An error occurred while processing your request.',
      };
      
      const newId = counter;
      setCounter(prev => prev + 1);
      
      setToasts(prev => [
        ...prev,
        {
          id: newId,
          variant,
          title: titles[variant],
          description: descriptions[variant],
          visible: true,
        },
      ]);
    };
    
    const removeToast = (id: number) => {
      setToasts(prev => prev.map(toast => 
        toast.id === id ? { ...toast, visible: false } : toast
      ));
      
      // Clean up after animation
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, 500);
    };
    
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {variants.map(variant => (
            <button
              key={variant}
              className={cn(
                "rounded px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-1",
                {
                  'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500': variant === 'info',
                  'bg-success-600 hover:bg-success-700 focus:ring-success-500': variant === 'success',
                  'bg-warning-600 hover:bg-warning-700 focus:ring-warning-500': variant === 'warning',
                  'bg-error-600 hover:bg-error-700 focus:ring-error-500': variant === 'error',
                }
              )}
              onClick={() => addToast(variant)}
            >
              Show {variant} toast
            </button>
          ))}
        </div>
        
        <Typography variant="helper">
          Click the buttons above to show different types of toasts.
        </Typography>
        
        <div className="fixed bottom-4 right-4 z-50 flex max-w-xs flex-col gap-2">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              description={toast.description}
              visible={toast.visible}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}