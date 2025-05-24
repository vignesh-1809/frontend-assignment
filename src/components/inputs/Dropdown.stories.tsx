import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { Globe, User } from 'lucide-react';

/**
 * `Dropdown` provides a customizable select menu with various states and features.
 * 
 * ## Features
 * - Multiple sizes (sm, md, lg)
 * - Various states (default, error, disabled)
 * - Support for icons
 * - Clearable option
 * - Helper text and error message support
 * - Keyboard navigation
 * - ARIA attributes for accessibility
 * 
 * ## Accessibility
 * - Proper ARIA attributes for dropdown menus
 * - Keyboard navigation support (arrows, enter, escape)
 * - Focus management
 * 
 * ## Usage Guidelines
 * - Always provide a clear label
 * - Use meaningful option labels
 * - Consider disabling irrelevant options rather than hiding them
 * - Use helper text to provide selection guidance
 */
const meta: Meta<typeof Dropdown> = {
  title: 'Forms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The visual style variant of the dropdown',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the dropdown',
    },
    label: {
      control: 'text',
      description: 'Label text for the dropdown',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the dropdown',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the dropdown allows clearing the selection',
    },
    icon: {
      control: { disable: true },
      description: 'Icon to display on the left side of the dropdown',
    },
  },
  args: {
    placeholder: 'Select an option',
    label: 'Dropdown',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: 'A customizable dropdown component with support for various states and features.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithPreselectedValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('option2');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Select one of the available options',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    error: 'Please select an option',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Globe size={16} />,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
  },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
        onClear={() => setValue('')}
      />
    );
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
    })),
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const VariantShowcase: Story = {
  render: () => {
    const [values, setValues] = useState({
      default: '',
      helper: '',
      error: '',
      disabled: 'option1',
      icon: '',
      small: '',
      large: '',
      clearable: 'option2',
    });
    
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
    
    const updateValue = (key: keyof typeof values, value: string) => {
      setValues(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div className="space-y-6">
        <Dropdown 
          label="Default dropdown" 
          placeholder="Select an option"
          options={options}
          value={values.default}
          onChange={(value) => updateValue('default', value)}
        />
        
        <Dropdown 
          label="With helper text"
          placeholder="Select an option"
          helperText="This provides additional guidance"
          options={options}
          value={values.helper}
          onChange={(value) => updateValue('helper', value)}
        />
        
        <Dropdown 
          label="With error"
          placeholder="Select an option"
          error="This field is required"
          options={options}
          value={values.error}
          onChange={(value) => updateValue('error', value)}
        />
        
        <Dropdown 
          label="Disabled dropdown"
          placeholder="You cannot change this"
          options={options}
          value={values.disabled}
          onChange={(value) => updateValue('disabled', value)}
          disabled
        />
        
        <Dropdown 
          label="With icon"
          placeholder="Select an option"
          options={options}
          value={values.icon}
          onChange={(value) => updateValue('icon', value)}
          icon={<User size={16} />}
        />
        
        <Dropdown 
          label="Small size"
          placeholder="Select an option"
          options={options}
          value={values.small}
          onChange={(value) => updateValue('small', value)}
          size="sm"
        />
        
        <Dropdown 
          label="Large size"
          placeholder="Select an option"
          options={options}
          value={values.large}
          onChange={(value) => updateValue('large', value)}
          size="lg"
        />
        
        <Dropdown 
          label="Clearable"
          placeholder="Select an option"
          options={options}
          value={values.clearable}
          onChange={(value) => updateValue('clearable', value)}
          clearable
          onClear={() => updateValue('clearable', '')}
        />
      </div>
    );
  },
};