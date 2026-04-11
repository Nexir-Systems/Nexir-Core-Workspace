import { Meta, StoryObj } from '@storybook/angular';

import { EntityListItemComponent } from './entity-list-item.component';

const meta: Meta<EntityListItemComponent> = {
  title: 'Shared/EntityListItem',
  component: EntityListItemComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Dense two-line list row: `primary` title and optional `secondary` muted line (dashboard shortcuts, simple lists).',
      },
    },
  },
  argTypes: {
    primary: { control: 'text' },
    secondary: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<EntityListItemComponent>;

export const Default: Story = {
  args: {
    primary: 'Sample record',
    secondary: 'Neutral description line for list density checks.',
  },
};
