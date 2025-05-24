import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

/**
 * `Typography` provides consistent text styling across the application.
 * 
 * ## Features
 * - Multiple variants for different text styles (h1-h6, body, caption, etc.)
 * - Font weight control
 * - Text alignment options
 * - Color variants
 * - Truncation support
 * 
 * ## Accessibility
 * - Uses semantic HTML elements (h1-h6, p, span) based on the variant
 * - Maintains readable font sizes and proper contrast ratios
 * - Supports responsive behavior
 * 
 * ## Usage Guidelines
 * - Use heading variants (h1-h6) for section titles maintaining hierarchical structure
 * - Use body variants for main content
 * - Use caption and helper text for supporting information
 * - Maintain a consistent type hierarchy throughout your application
 */
const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle1', 'subtitle2',
        'body1', 'body2',
        'caption', 'overline', 'helper'
      ],
      description: 'The typography variant to use',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight to apply',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'muted'],
      description: 'Text color variant',
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to truncate text with an ellipsis when it overflows',
    },
    as: {
      control: 'text',
      description: 'The HTML element to render as',
    },
    children: {
      control: 'text',
      description: 'The content to display',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive typography system for consistent text styling across applications.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

export const Heading6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1 - A slightly larger subtitle with medium weight',
  },
};

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2 - A smaller subtitle with medium weight',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 - The default text style for body content. This should be used for the main content of your application.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 - A smaller text style that can be used for less important content or when space is limited.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption - Very small text used for captions, labels, and other supporting text.',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'OVERLINE TEXT FOR LABELS',
  },
};

export const HelperText: Story = {
  args: {
    variant: 'helper',
    children: 'Helper text provides additional guidance or information, such as field requirements or error messages.',
  },
};

export const CustomWeight: Story = {
  args: {
    variant: 'body1',
    weight: 'bold',
    children: 'This text has a custom bold weight applied.',
  },
};

export const CenteredText: Story = {
  args: {
    variant: 'body1',
    align: 'center',
    children: 'This text is centered on the page regardless of its variant.',
  },
};

export const PrimaryColor: Story = {
  args: {
    variant: 'body1',
    color: 'primary',
    children: 'This text uses the primary color.',
  },
};

export const TruncatedText: Story = {
  args: {
    variant: 'body1',
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it reaches the end of its container because the truncate prop is set to true.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const TypographySystem: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1 - Main content text</Typography>
      <Typography variant="body2">Body 2 - Secondary content text</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">OVERLINE TEXT</Typography>
      <Typography variant="helper">Helper text for additional information</Typography>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="default">Default Color</Typography>
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="accent">Accent Color</Typography>
      <Typography color="success">Success Color</Typography>
      <Typography color="warning">Warning Color</Typography>
      <Typography color="error">Error Color</Typography>
      <Typography color="muted">Muted Color</Typography>
    </div>
  ),
};