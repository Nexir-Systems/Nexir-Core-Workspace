import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import type { EntityFormGroup } from '../forms/entity-form';

@Component({
  selector: 'nx-entity-form-fields',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()" class="nx-entity-form__grid">
      <section class="nx-entity-form__section" aria-labelledby="entity-basic-heading">
        <h2 id="entity-basic-heading" class="nx-entity-form__section-title">Basic information</h2>
        <mat-form-field appearance="outline" class="nx-entity-form__field">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" autocomplete="off" />
          @if (form().controls.name.hasError('required')) {
            <mat-error>Name is required</mat-error>
          }
          @if (form().controls.name.hasError('minlength')) {
            <mat-error>At least 2 characters</mat-error>
          }
          @if (form().controls.name.hasError('maxlength')) {
            <mat-error>Too long</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline" class="nx-entity-form__field">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="4"></textarea>
          @if (form().controls.description.hasError('required')) {
            <mat-error>Description is required</mat-error>
          }
        </mat-form-field>
      </section>

      <section class="nx-entity-form__section" aria-labelledby="entity-class-heading">
        <h2 id="entity-class-heading" class="nx-entity-form__section-title">Classification</h2>
        <mat-form-field appearance="outline" class="nx-entity-form__field">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="draft">Draft</mat-option>
            <mat-option value="active">Active</mat-option>
            <mat-option value="archived">Archived</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="nx-entity-form__field">
          <mat-label>Category</mat-label>
          <mat-select formControlName="category">
            <mat-option value="general">General</mat-option>
            <mat-option value="research">Research</mat-option>
            <mat-option value="operations">Operations</mat-option>
            <mat-option value="internal">Internal</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="nx-entity-form__field">
          <mat-label>Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option value="low">Low</mat-option>
            <mat-option value="medium">Medium</mat-option>
            <mat-option value="high">High</mat-option>
          </mat-select>
        </mat-form-field>
      </section>

      <section class="nx-entity-form__section" aria-labelledby="entity-owner-heading">
        <h2 id="entity-owner-heading" class="nx-entity-form__section-title">Ownership</h2>
        <mat-form-field appearance="outline" class="nx-entity-form__field">
          <mat-label>Owner</mat-label>
          <input matInput formControlName="owner" autocomplete="off" />
          @if (form().controls.owner.hasError('required')) {
            <mat-error>Owner is required</mat-error>
          }
        </mat-form-field>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .nx-entity-form__grid {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 0;
    }
    .nx-entity-form__section {
      padding: 0 0 1.35rem;
      margin: 0 0 1.35rem;
      border-bottom: 1px solid var(--nx-card-border);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .nx-entity-form__section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .nx-entity-form__section-title {
      font: var(--mat-sys-title-medium);
      margin: 0 0 0.25rem;
      color: var(--mat-sys-on-surface);
      letter-spacing: 0.01em;
    }
    .nx-entity-form__field {
      width: 100%;
    }
  `,
})
export class EntityFormFieldsComponent {
  readonly form = input.required<EntityFormGroup>();
}
