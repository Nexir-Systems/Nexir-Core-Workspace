import { Meta, StoryObj } from '@storybook/angular';

import { EntityCatalogToolbarComponent } from './entity-catalog-toolbar.component';

const meta: Meta<EntityCatalogToolbarComponent> = {
  title: 'Entities/EntityCatalogToolbar',
  component: EntityCatalogToolbarComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Search / status / category / sort controls bound to EntitiesStore. Shared by Entities and Favorites; filter state survives route changes until the user changes it.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<EntityCatalogToolbarComponent>;

export const Default: Story = {
  name: 'Default',
};
