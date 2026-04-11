import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'nx-section-card',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card appearance="outlined" class="nx-section-card nx-product-surface">
      @if (title()) {
        <mat-card-header>
          <mat-card-title>{{ title() }}</mat-card-title>
          @if (subtitle()) {
            <mat-card-subtitle>{{ subtitle() }}</mat-card-subtitle>
          }
        </mat-card-header>
      }
      <mat-card-content>
        <ng-content />
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    :host {
      display: block;
    }
    .nx-section-card .mat-mdc-card-header {
      padding: 1.75rem 1.75rem 0;
    }
    .nx-section-card .mat-mdc-card-content {
      padding: 1.35rem 1.85rem 1.95rem;
    }
  `,
})
export class SectionCardComponent {
  readonly title = input<string>();
  readonly subtitle = input<string>();
}
