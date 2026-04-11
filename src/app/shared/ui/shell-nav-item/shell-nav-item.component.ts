import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'nx-shell-nav-item',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      mat-list-item
      [routerLink]="link()"
      routerLinkActive="nx-shell-nav-item--active"
      [routerLinkActiveOptions]="{ exact: false }"
    >
      @if (icon()) {
        <mat-icon matListItemIcon class="nx-shell-nav-item__icon">{{ icon() }}</mat-icon>
      }
      <span matListItemTitle>{{ label() }}</span>
    </a>
  `,
  styles: `
    :host {
      display: block;
    }
    a[mat-list-item] {
      border-radius: 10px;
      transition: background-color 0.15s ease;
    }
    a[mat-list-item]:focus-visible {
      outline: 2px solid color-mix(in srgb, var(--mat-sys-primary) 45%, transparent);
      outline-offset: 2px;
    }
    .nx-shell-nav-item__icon {
      color: var(--mat-sys-on-surface-variant);
    }
    .nx-shell-nav-item--active .nx-shell-nav-item__icon {
      color: var(--mat-sys-primary);
    }
    .nx-shell-nav-item--active {
      background-color: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent);
    }
  `,
})
export class ShellNavItemComponent {
  readonly label = input.required<string>();
  readonly link = input.required<string>();
  /** Material Symbols / icon font ligature name */
  readonly icon = input<string>();
}
