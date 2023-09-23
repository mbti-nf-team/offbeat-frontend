import { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import ResultCard from '.';

const styles: CSSProperties = {
  maxWidth: 400,
};

const meta: Meta<typeof ResultCard> = {
  title: 'Components/ResultCard',
  component: ResultCard,
  tags: ['autodocs'],
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Default: Story = {
  args: {
    title: '{{title}}',
    description: '{{description}}',
    url: '#',
  },
};

export const HasThumbnail: Story = {
  args: {
    title: '{{title}}',
    description: '{{description}}',
    url: '#',
    thumbnail: './images/korea-flag.png',
  },
};
