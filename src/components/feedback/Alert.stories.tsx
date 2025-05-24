import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Alert from './Alert';

/**
 * `Alert` displays important messages that users should pay attention to.
 * 
 * ## Features
 * - Multiple variants (info, success, warning, error)
 * - Optional title and description
 * - Optional dismiss button
 * - Supports custom actions
 * 
 * ## Accessibility
 * - Uses proper role="alert"
 * - Dismiss button has accessible name
 * - Color combinations meet WCAG contrast requirements
 * 
 * ## Usage Guidelines
 * - Use for persistent, important information
 * - Choose appropriate variant based on message importance
 * - Keep message content concise and actionable
 * - Include actions when users need to respond to the alert
 */
const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style variant of the alert',
    },
    title: {
      control: 'text',
      description: 'Title of the alert',
    },
    description: {
      control: 'text',
      description: 'Description of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    icon: {
      control: { disable: true },
      description: 'Custom icon to override the default',
    },
    action: {
      control: { disable: true },
      description: 'Action buttons or links',
    },
  },
  args: {
    title: 'Alert Title',
    description: 'This is an alert message providing some important information.',
    dismissible: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'A customizable alert component for displaying important messages.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

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
    description: 'An alert message without a title.',
  },
};

export const Dismissible: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    
    if (!visible) {
      return (
        <button
          className="rounded bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
          onClick={() => setVisible(true)}
        >
          Show Alert Again
        </button>
      );
    }
    
    return (
      <Alert
        {...args}
        dismissible
        onDismiss={() => setVisible(false)}
      />
    );
  },
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    description: 'You can dismiss this alert by clicking the X button.',
  },
};

export const WithAction: Story = {
  render: (args) => (
    <Alert
      {...args}
      action={
        <div className="flex gap-2">
          <button className="rounded bg-primary-600 px-2 py-1 text-xs font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
            Accept
          </button>
          <button className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            Decline
          </button>
        </div>
      }
    />
  ),
  args: {
    variant: 'warning',
    title: 'Accept Cookies',
    description: 'We use cookies to enhance your experience on our website.',
  },
};

export const NoIcon: Story = {
  args: {
    variant: 'info',
    title: 'Alert without icon',
    description: 'This alert has no icon.',
    icon: null,
  },
};

export const AlertShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="Information"
        description="System maintenance scheduled for tomorrow at 2 AM."
      />
      
      <Alert
        variant="success"
        title="Profile Updated"
        description="Your profile information has been successfully updated."
      />
      
      <Alert
        variant="warning"
        title="Account Expiring"
        description="Your subscription will expire in 5 days. Please renew to avoid service interruption."
        action={
          <button className="rounded bg-warning-600 px-2 py-1 text-xs font-medium text-white hover:bg-warning-700 focus:outline-none focus:ring-2 focus:ring-warning-500 focus:ring-offset-1">
            Renew Now
          </button>
        }
      />
      
      <Alert
        variant="error"
        title="Payment Failed"
        description="We couldn't process your payment. Please update your payment information."
        action={
          <div className="flex gap-2">
            <button className="rounded bg-error-600 px-2 py-1 text-xs font-medium text-white hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-1">
              Update Payment
            </button>
            <button className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Contact Support
            </button>
          </div>
        }
        dismissible
      />
    </div>
  ),
};