import { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Spinner from '.';

const styles: CSSProperties = {
  backgroundColor: 'rgba(19, 17, 24, 0.1)',
  padding: '20px',
};

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const EmphasisSpinner: Story = {
  args: {
    color: 'black',
    isLoading: true,
  },
};

export const DeEmphasisSpinner: Story = {
  args: {
    color: 'white',
    isLoading: true,
  },
};

export const LargeSpinner: Story = {
  args: {
    color: 'black',
    isLoading: true,
    size: 'large',
  },
};

export const MediumSpinner: Story = {
  args: {
    color: 'black',
    isLoading: true,
    size: 'medium',
  },
};

export const SmallSpinner: Story = {
  args: {
    color: 'black',
    isLoading: true,
    size: 'small',
  },
};
