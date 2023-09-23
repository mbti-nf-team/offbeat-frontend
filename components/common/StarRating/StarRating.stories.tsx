import type { Meta, StoryObj } from '@storybook/react';

import StarRating from '.';

const meta: Meta<typeof StarRating> = {
  title: 'Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  args: {
    rating: 4.3,
  },
};

export default meta;

type Story = StoryObj<typeof StarRating>;

export const ListStarRating: Story = {
  args: {
    type: 'list',
  },
};

export const DetailStarRating: Story = {
  args: {
    type: 'detail',
  },
};
