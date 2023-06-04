import { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import ResultCard from '../ResultCard';

import Accordion from '.';

const styles: CSSProperties = {
  maxWidth: 430,
};

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ResultCard url="#" title="title" description="description" />
        <ResultCard url="#" title="title" description="description" />
        <ResultCard url="#" title="title" description="description" />
        <ResultCard url="#" title="title" description="description" />
      </div>
    ),
    counter: 9999,
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: '{{title}}',
  },
};
