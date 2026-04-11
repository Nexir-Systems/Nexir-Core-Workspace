import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'nx-info-panel',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-info-panel nx-product-surface" role="note">
      <mat-icon class="nx-info-panel__icon">info</mat-icon>
      <div class="nx-info-panel__body">
        <div class="nx-info-panel__title">{{ title() }}</div>
        <div class="nx-info-panel__content">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .nx-info-panel {
      display: flex;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      align-items: flex-start;
    }
    .nx-info-panel__icon {
      flex-shrink: 0;
      color: var(--mat-sys-primary);
    }
    .nx-info-panel__title {
      font: var(--mat-sys-title-small);
      margin-bottom: 0.25rem;
    }
    .nx-info-panel__content {
      font: var(--mat-sys-body-medium);
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class InfoPanelComponent {
  readonly title = input.required<string>();
}
