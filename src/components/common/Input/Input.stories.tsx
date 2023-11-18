import type { Meta, StoryObj } from '@storybook/react';

import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    isVisibleMenuIcon: {
      table: {
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    value: {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
    placeholder: {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    goBack: {
      type: { name: 'function' },
      table: {
        type: { summary: '(() => void)' },
      },
    },
    onRemove: {
      type: { name: 'function' },
      table: {
        type: { summary: '(() => void)' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요.',
    isVisibleMenuIcon: false,
    onChange: () => {},
  },
};

export const ShowSearchIcon: Story = {
  args: {
    placeholder: '입력하세요.',
    showSearchIcon: true,
    onChange: () => {},
  },
};

export const VisibleMenuIcon: Story = {
  args: {
    placeholder: '입력하세요.',
    isVisibleMenuIcon: true,
    onChange: () => {},
  },
};

export const VisibleShadowStyle: Story = {
  args: {
    placeholder: '입력하세요.',
    visibleShadow: true,
    onChange: () => {},
  },
};
