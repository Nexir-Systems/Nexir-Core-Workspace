import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthStore } from '@features/auth/store/auth.store';
import { ShellNavItemComponent } from '../ui/shell-nav-item/shell-nav-item.component';

@Component({
  selector: 'nx-app-shell',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ShellNavItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  protected readonly authStore = inject(AuthStore);
  protected readonly sidenavOpen = signal(true);

  protected toggleSidenav(): void {
    this.sidenavOpen.update((v) => !v);
  }
}
