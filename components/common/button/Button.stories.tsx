import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'label',
    },
    href: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: { type: 'select' },
    },
    size: {
      control: { type: 'radio' },
    },
    isLoading: {
      table: {
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    isFloating: {
      table: {
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const MediumSize: Story = {
  args: {
    size: 'medium',
    children: 'Label',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    children: 'Label',
  },
};

export const Floating: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    isFloating: true,
  },
};

export const Disabled: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    isLoading: true,
  },
};

export const WithLink: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    href: '/test',
  },
};

export const HighlightColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'highlight',
  },
};

export const DoneColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'done',
  },
};

export const PositiveColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'positive',
  },
};

export const DangerColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'danger',
  },
};

export const AttentionColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'attention',
  },
};

export const ActiveColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'active',
  },
};

export const RelateColor: Story = {
  args: {
    size: 'medium',
    children: 'Label',
    color: 'relate',
  },
};
