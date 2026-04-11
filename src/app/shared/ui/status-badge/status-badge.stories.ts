import { Meta, StoryObj } from '@storybook/angular';

import { StatusBadgeComponent } from './status-badge.component';

const meta: Meta<StatusBadgeComponent> = {
  title: 'Shared/StatusBadge',
  component: StatusBadgeComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Pill chips: general tones (`neutral`, `positive`, `attention`) plus entity lifecycle (`entityActive`, `entityDraft`, `entityArchived`) for catalog/detail.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    tone: {
      control: 'select',
      options: [
        'neutral',
        'positive',
        'attention',
        'entityActive',
        'entityDraft',
        'entityArchived',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<StatusBadgeComponent>;

export const Neutral: Story = {
  args: { label: 'Neutral', tone: 'neutral' },
};

export const Positive: Story = {
  args: { label: 'Active', tone: 'positive' },
};

export const Attention: Story = {
  args: { label: 'Review', tone: 'attention' },
};

export const EntityActive: Story = {
  args: { label: 'Active', tone: 'entityActive' },
};

export const EntityDraft: Story = {
  args: { label: 'Draft', tone: 'entityDraft' },
};

export const EntityArchived: Story = {
  args: { label: 'Archived', tone: 'entityArchived' },
};
