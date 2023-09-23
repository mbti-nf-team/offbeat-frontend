import type { Meta, StoryObj } from '@storybook/react';

import { ChevronDownIcon, ChevronUpIcon } from '@/lib/assets/icons';

import Label from '.';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Label',
    onClick: undefined,
    color: 'highlight',
  },
  argTypes: {
    prefixIcon: {
      description: '`React.FunctionComponent<React.SVGAttributes<SVGElement>>`',
    },
    suffixIcon: {
      description: '`React.FunctionComponent<React.SVGAttributes<SVGElement>>`',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const DefaultType: Story = {
  args: {
    type: 'default',
    size: 'medium',
  },
};

export const ReverseType: Story = {
  args: {
    type: 'reverse',
    size: 'medium',
  },
};

export const MediumSize: Story = {
  args: {
    type: 'default',
    size: 'medium',
  },
};

export const SmallSize: Story = {
  args: {
    type: 'default',
    size: 'small',
  },
};

export const HighlightColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'highlight',
  },
};

export const DoneColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'done',
  },
};

export const PositiveColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'positive',
  },
};

export const DangerColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'danger',
  },
};

export const ActiveColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'active',
  },
};

export const AttentionColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'attention',
  },
};

export const RelateColor: Story = {
  args: {
    type: 'default',
    size: 'medium',
    color: 'relate',
  },
};

export const HasClickEventLabel: Story = {
  args: {
    type: 'default',
    size: 'medium',
    onClick: () => alert('clicked label!'),
  },
};

export const HasPrefixIcon: Story = {
  args: {
    type: 'default',
    size: 'medium',
    prefixIcon: <ChevronDownIcon />,
  },
};

export const HasSuffixIcon: Story = {
  args: {
    type: 'default',
    size: 'medium',
    suffixIcon: <ChevronUpIcon />,
  },
};
