import { Meta, StoryObj } from '@storybook/angular';

import { SectionCardComponent } from './section-card.component';

const meta: Meta<SectionCardComponent> = {
  title: 'Shared/SectionCard',
  component: SectionCardComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Outlined `mat-card` with optional title/subtitle and projected body. Uses `nx-product-surface` for consistent shell padding.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Card heading (omit for content-only blocks).' },
    subtitle: { control: 'text', description: 'Muted line under the title.' },
  },
};

export default meta;

type Story = StoryObj<SectionCardComponent>;

export const Default: Story = {
  args: {
    title: 'Section title',
    subtitle: 'Optional subtitle for context',
  },
  render: (args) => ({
    props: args,
    template: `
      <nx-section-card [title]="title" [subtitle]="subtitle">
        <p>Slot content uses the default body typography.</p>
      </nx-section-card>
    `,
  }),
};
