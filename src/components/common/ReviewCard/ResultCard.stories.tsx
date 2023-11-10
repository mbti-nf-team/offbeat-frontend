import { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import ReviewCard from '.';

const styles: CSSProperties = {
  maxWidth: 400,
};

const meta: Meta<typeof ReviewCard> = {
  title: 'Components/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
};

export default meta;

type Story = StoryObj<typeof ReviewCard>;

export const Default: Story = {
  args: {
    author: '{{author}}',
    review: '{{review}}',
    rating: 4.3,
    createdAt: '2달 전',
    profileUrl: '/images/korea-flag.png',
  },
};

export const IsKoreanReview: Story = {
  args: {
    author: '{{title}}',
    review: '{{description}}',
    rating: 4.3,
    isKoreanReview: true,
    createdAt: '2달 전',
    profileUrl: '/images/korea-flag.png',
  },
};

export const HasSeparator: Story = {
  args: {
    author: '{{title}}',
    review: '{{description}}',
    rating: 4.3,
    isKoreanReview: true,
    createdAt: '2달 전',
    hasSeparator: true,
    profileUrl: '/images/korea-flag.png',
  },
};
