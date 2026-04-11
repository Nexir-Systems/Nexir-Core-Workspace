import { Meta, StoryObj } from '@storybook/angular';

import { MOCK_ENTITIES_SEED } from '../../data/mock-entities';

import { EntityCatalogTableComponent } from './entity-catalog-table.component';

const meta: Meta<EntityCatalogTableComponent> = {
  title: 'Entities/EntityCatalogTable',
  component: EntityCatalogTableComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Shared catalog table (Entities + Favorites). Star state comes from FavoriteEntitiesService. Outputs: `editRow`, `favoriteToggle`. Set `favoriteStarFilled` for the Favorites route so stars render filled.',
      },
    },
  },
  argTypes: {
    favoriteStarFilled: {
      control: 'boolean',
      description: 'When true, stars always use the filled glyph (Favorites page).',
    },
    rows: {
      control: 'object',
      description: 'Current page slice (already paginated).',
    },
  },
};

export default meta;

type Story = StoryObj<EntityCatalogTableComponent>;

export const CatalogList: Story = {
  name: 'Catalog (entities)',
  args: {
    rows: MOCK_ENTITIES_SEED.slice(0, 5),
    favoriteStarFilled: false,
  },
};

export const FavoritesList: Story = {
  name: 'Favorites (filled stars)',
  args: {
    rows: MOCK_ENTITIES_SEED.slice(0, 3),
    favoriteStarFilled: true,
  },
};
