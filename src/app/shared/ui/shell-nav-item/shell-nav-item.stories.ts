import { provideRouter } from '@angular/router';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';

import { ShellNavItemComponent } from './shell-nav-item.component';

const meta: Meta<ShellNavItemComponent> = {
  title: 'Shared/ShellNavItem',
  component: ShellNavItemComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Sidenav row: `routerLink` + `routerLinkActive` with Nexir active tint. `icon` is a Material Symbols ligature name.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    link: { control: 'text', description: 'Router path (e.g. `/entities`).' },
    icon: { control: 'text', description: 'Material icon name (optional).' },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**', redirectTo: '' }])],
    }),
  ],
};

export default meta;

type Story = StoryObj<ShellNavItemComponent>;

export const Default: Story = {
  args: {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/',
  },
};
