import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const SNACK_OPTS = {
  horizontalPosition: 'end' as const,
  verticalPosition: 'bottom' as const,
};

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private readonly snack = inject(MatSnackBar);

  success(message: string, durationMs = 4000): void {
    this.snack.open(message, 'Dismiss', {
      ...SNACK_OPTS,
      duration: durationMs,
      panelClass: ['nx-snackbar', 'nx-snackbar--success'],
    });
  }

  info(message: string, durationMs = 4000): void {
    this.snack.open(message, 'Dismiss', {
      ...SNACK_OPTS,
      duration: durationMs,
      panelClass: ['nx-snackbar', 'nx-snackbar--info'],
    });
  }

  error(message: string, durationMs = 6000): void {
    this.snack.open(message, 'Dismiss', {
      ...SNACK_OPTS,
      duration: durationMs,
      panelClass: ['nx-snackbar', 'nx-snackbar--error'],
    });
  }
}
