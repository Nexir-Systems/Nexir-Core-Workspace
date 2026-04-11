import { Meta, StoryObj } from '@storybook/angular';

import { InfoPanelComponent } from './info-panel.component';

const meta: Meta<InfoPanelComponent> = {
  title: 'Shared/InfoPanel',
  component: InfoPanelComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Inline note with fixed info icon and projected body — onboarding hints and form context.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<InfoPanelComponent>;

export const Default: Story = {
  args: {
    title: 'Guidance',
  },
  render: (args) => ({
    props: args,
    template: `
      <nx-info-panel [title]="title">
        <p>Short supporting copy for onboarding and contextual hints.</p>
      </nx-info-panel>
    `,
  }),
};
