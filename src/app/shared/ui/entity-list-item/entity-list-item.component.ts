import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'nx-entity-list-item',
  imports: [MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list-item>
      <span matListItemTitle>{{ primary() }}</span>
      @if (secondary()) {
        <span matListItemLine class="nx-muted">{{ secondary() }}</span>
      }
    </mat-list-item>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class EntityListItemComponent {
  readonly primary = input.required<string>();
  readonly secondary = input<string>();
}
