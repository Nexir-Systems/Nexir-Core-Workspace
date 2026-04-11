import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChip } from '@angular/material/chips';

/** General-purpose tones + entity lifecycle presets (catalog / detail). */
export type NxBadgeTone =
  | 'neutral'
  | 'positive'
  | 'attention'
  | 'entityActive'
  | 'entityDraft'
  | 'entityArchived';

@Component({
  selector: 'nx-status-badge',
  imports: [MatChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mat-chip [class]="chipClass()">{{ label() }}</mat-chip> `,
  styles: `
    :host {
      display: inline-block;
    }
    mat-chip {
      border-radius: 999px;
      font: var(--mat-sys-label-medium);
      font-weight: 500;
    }
    .nx-badge--neutral {
      --mdc-chip-elevated-container-color: var(--mat-sys-surface-container-high);
    }
    .nx-badge--positive {
      --mdc-chip-elevated-container-color: color-mix(
        in srgb,
        var(--mat-sys-primary) 12%,
        transparent
      );
    }
    .nx-badge--attention {
      --mdc-chip-elevated-container-color: color-mix(
        in srgb,
        var(--mat-sys-tertiary) 14%,
        transparent
      );
    }
    .nx-badge--entity-active {
      --mdc-chip-elevated-container-color: color-mix(
        in srgb,
        #22c55e 26%,
        var(--mat-sys-surface-container-high) 74%
      );
      color: var(--mat-sys-on-surface);
    }
    .nx-badge--entity-draft {
      --mdc-chip-elevated-container-color: color-mix(
        in srgb,
        var(--mat-sys-surface-container-highest) 88%,
        var(--mat-sys-surface) 12%
      );
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 90%, transparent);
      color: var(--mat-sys-on-surface);
    }
    .nx-badge--entity-archived {
      --mdc-chip-elevated-container-color: color-mix(
        in srgb,
        var(--mat-sys-on-surface-variant) 18%,
        var(--mat-sys-surface-container-high) 82%
      );
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly tone = input<NxBadgeTone>('neutral');

  chipClass(): string {
    switch (this.tone()) {
      case 'positive':
        return 'nx-badge--positive';
      case 'attention':
        return 'nx-badge--attention';
      case 'entityActive':
        return 'nx-badge--entity-active';
      case 'entityDraft':
        return 'nx-badge--entity-draft';
      case 'entityArchived':
        return 'nx-badge--entity-archived';
      default:
        return 'nx-badge--neutral';
    }
  }
}
