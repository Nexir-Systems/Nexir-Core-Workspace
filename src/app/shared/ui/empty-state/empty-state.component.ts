import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'nx-empty-state',
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-empty">
      @if (icon()) {
        <mat-icon class="nx-empty__icon">{{ icon() }}</mat-icon>
      }
      <h3 class="nx-empty__title">{{ title() }}</h3>
      @if (description()) {
        <p class="nx-empty__desc nx-muted">{{ description() }}</p>
      }
      @if (actionLabel()) {
        <button mat-flat-button color="primary" type="button" (click)="action.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .nx-empty {
      text-align: center;
      padding: 2rem 1rem;
    }
    .nx-empty__icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: var(--mat-sys-on-surface-variant);
      margin-bottom: 0.5rem;
    }
    .nx-empty__title {
      font: var(--mat-sys-title-large);
      margin: 0 0 0.5rem;
    }
    .nx-empty__desc {
      margin: 0 0 1rem;
      max-width: 420px;
      margin-inline: auto;
    }
  `,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<string>('inbox');
  readonly actionLabel = input<string>();
  readonly action = output<void>();
}
