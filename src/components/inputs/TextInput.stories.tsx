import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextInput from './TextInput';
import { Mail, Search, User } from 'lucide-react';

/**
 * `TextInput` provides a customizable input field with various states and features.
 * 
 * ## Features
 * - Multiple sizes (sm, md, lg)
 * - Various states (default, error, disabled)
 * - Support for icons (left and right)
 * - Password visibility toggle
 * - Clearable input option
 * - Helper text and error message support
 * 
 * ## Accessibility
 * - Proper labeling with associated helper/error text
 * - ARIA attributes for states (aria-invalid, aria-describedby)
 * - Keyboard navigation support
 * 
 * ## Usage Guidelines
 * - Always provide a label for inputs
 * - Use helper text to provide additional guidance
 * - Clearly indicate errors with both color and text
 * - Consider using icons to enhance visual understanding
 */
const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The type of the input',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the input can be cleared with a button',
    },
    leftIcon: {
      control: { disable: true },
      description: 'Icon to display on the left side of the input',
    },
    rightIcon: {
      control: { disable: true },
      description: 'Icon to display on the right side of the input',
    },
  },
  args: {
    placeholder: 'Enter text...',
    label: 'Label',
  },
  parameters: {
    docs: {
      description: {
        component: 'A customizable text input component with support for various states and features.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {},
};

export const WithHelperText: Story = {
  args: {
    helperText: 'This is a helpful message',
  },
};

export const WithError: Story = {
  args: {
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Mail size={16} />,
    placeholder: 'Enter your email',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Search size={16} />,
    placeholder: 'Search...',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState('Clear me!');
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearable
        onClear={() => setValue('')}
      />
    );
  },
};

export const WithAllFeatures: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        label="Full-featured input"
        placeholder="Type something..."
        helperText="This input has all the bells and whistles"
        leftIcon={<User size={16} />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearable
        onClear={() => setValue('')}
      />
    );
  },
};

export const VariantShowcase: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <TextInput 
          label="Default input" 
          placeholder="Default state" 
        />
        
        <TextInput 
          label="With helper text" 
          placeholder="With additional information"
          helperText="This is some helpful information about the field" 
        />
        
        <TextInput 
          label="With error" 
          placeholder="Error state"
          error="This field has an error" 
          value="Invalid input"
        />
        
        <TextInput 
          label="Disabled input" 
          placeholder="You cannot edit this"
          disabled 
          value="Disabled value"
        />
        
        <TextInput 
          label="Password input" 
          type="password"
          placeholder="Enter password" 
          value="password123"
        />
        
        <TextInput 
          label="With left icon" 
          placeholder="Enter email"
          leftIcon={<Mail size={16} />} 
        />
        
        <TextInput 
          label="Small input" 
          placeholder="Small size"
          size="sm" 
        />
        
        <TextInput 
          label="Large input" 
          placeholder="Large size"
          size="lg" 
        />
      </div>
    );
  },
};