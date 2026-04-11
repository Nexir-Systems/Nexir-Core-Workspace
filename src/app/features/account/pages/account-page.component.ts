import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import {
  newPasswordsMatchValidator,
  PASSWORD_RULES_HINT,
  passwordStrengthValidator,
} from '@core/password-rules';
import { NotifyService } from '@core/notify.service';
import { SessionService } from '@core/session.service';

import { AuthApi } from '@features/auth/data/auth.api';

import { SectionCardComponent } from '@shared/ui/section-card/section-card.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'nx-account-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SectionCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  protected readonly session = inject(SessionService);
  private readonly api = inject(AuthApi);
  private readonly notify = inject(NotifyService);
  private readonly fb = inject(FormBuilder);

  protected readonly passwordHint = PASSWORD_RULES_HINT;

  protected readonly form = this.fb.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
    },
    { validators: newPasswordsMatchValidator() },
  );

  protected busy = false;
  protected errorMessage: string | null = null;

  protected async submit(): Promise<void> {
    this.errorMessage = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const email = this.session.userEmail();
    if (!email) {
      this.errorMessage = 'No active session.';
      return;
    }
    const { currentPassword, newPassword } = this.form.getRawValue();
    this.busy = true;
    try {
      await firstValueFrom(this.api.changePassword(email, currentPassword, newPassword));
      this.notify.success('Password updated.');
      this.form.reset();
    } catch (e) {
      this.errorMessage = e instanceof Error ? e.message : 'Could not update password.';
    } finally {
      this.busy = false;
    }
  }
}
