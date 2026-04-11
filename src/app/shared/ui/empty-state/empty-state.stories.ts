import { Meta, StoryObj } from '@storybook/angular';

import { EmptyStateComponent } from './empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  title: 'Shared/EmptyState',
  component: EmptyStateComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Centered empty pattern: optional icon, title, description, and one primary CTA via `action` output.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text', description: 'Material icon name (default inbox).' },
    actionLabel: { control: 'text', description: 'If set, shows a flat primary button.' },
  },
};

export default meta;

type Story = StoryObj<EmptyStateComponent>;

export const Default: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'Use this pattern for empty lists and placeholder regions.',
    icon: 'inbox',
    actionLabel: 'Primary action',
  },
};
