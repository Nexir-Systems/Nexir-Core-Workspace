import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
} from '../forms/entity-form';
import { EntitiesStore } from '../store/entities.store';

@Component({
  selector: 'nx-entity-create-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    EntityFormFieldsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entity-create-page.component.html',
  styleUrl: './entity-create-page.component.scss',
})
export class EntityCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);
  protected readonly store = inject(EntitiesStore);

  protected readonly form = createEntityFormGroup(this.fb);

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.clearListError();
    const row = await this.store.createEntity(payloadFromForm(this.form));
    if (row) {
      this.notify.success('Entity created.');
      void this.router.navigate(['/app/entities', row.id]);
    } else {
      this.notify.error(this.store.errorMessage() ?? 'Could not create the record.');
    }
  }

  protected applySample(): void {
    this.store.clearListError();
    patchFormFromPayload(this.form, getSampleEntityPayload());
    this.notify.info('Sample values applied to the form.');
  }

  protected cancel(): void {
    void this.router.navigate(['/app/entities']);
  }
}
