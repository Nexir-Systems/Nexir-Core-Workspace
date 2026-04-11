import type { Routes } from '@angular/router';

import { EntitiesLayoutComponent } from '../pages/entities-layout.component';
import { EntitiesListPageComponent } from '../pages/entities-list-page.component';
import { EntityCreatePageComponent } from '../pages/entity-create-page.component';
import { EntityDetailPageComponent } from '../pages/entity-detail-page.component';
import { EntityEditPageComponent } from '../pages/entity-edit-page.component';
import { EntityShellComponent } from '../pages/entity-shell.component';

export const ENTITIES_ROUTES: Routes = [
  {
    path: '',
    component: EntitiesLayoutComponent,
    children: [
      { path: '', component: EntitiesListPageComponent },
      { path: 'new', component: EntityCreatePageComponent },
      {
        path: ':id',
        component: EntityShellComponent,
        children: [
          { path: '', component: EntityDetailPageComponent },
          { path: 'edit', component: EntityEditPageComponent },
        ],
      },
    ],
  },
];
