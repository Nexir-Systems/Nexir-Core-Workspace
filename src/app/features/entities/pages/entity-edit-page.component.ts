import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NotifyService } from '@core/notify.service';

import { EntityFormFieldsComponent } from '../components/entity-form-fields.component';
import { getSampleEntityPayload } from '../data/entity-sample';
import {
  createEntityFormGroup,
  patchFormFromPayload,
  payloadFromForm,
  payloadFromRecord,
} from '../forms/entity-form';
import { EntitiesStore } from '../store/entities.store';

@Component({
  selector: 'nx-entity-edit-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    EntityFormFieldsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entity-edit-page.component.html',
  styleUrl: './entity-create-page.component.scss',
})
export class EntityEditPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notify = inject(NotifyService);
  protected readonly store = inject(EntitiesStore);

  protected readonly form = createEntityFormGroup(this.fb);

  async ngOnInit(): Promise<void> {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigate(['/app/entities']);
      return;
    }
    const row = await this.store.loadOne(id);
    if (!row) {
      return;
    }
    patchFormFromPayload(this.form, payloadFromRecord(row));
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.store.clearListError();
    const row = await this.store.updateEntity(id, payloadFromForm(this.form));
    if (row) {
      this.notify.success('Changes saved.');
      void this.router.navigate(['/app/entities', id]);
    } else {
      this.notify.error(this.store.errorMessage() ?? 'Could not save changes.');
    }
  }

  protected applySample(): void {
    this.store.clearListError();
    patchFormFromPayload(this.form, getSampleEntityPayload());
    this.notify.info('Sample values applied to the form.');
  }

  protected cancel(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      void this.router.navigate(['/app/entities', id]);
    } else {
      void this.router.navigate(['/app/entities']);
    }
  }
}
