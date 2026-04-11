import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { NotifyService } from '@core/notify.service';

import { SectionCardComponent } from '@shared/ui/section-card/section-card.component';

import { SettingsStore } from '../store/settings.store';

@Component({
  selector: 'nx-settings-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    SectionCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent implements OnInit {
  protected readonly store = inject(SettingsStore);
  private readonly notify = inject(NotifyService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.fb.nonNullable.group({
    themeHint: this.fb.nonNullable.control<'system' | 'light' | 'dark'>('dark'),
    density: this.fb.nonNullable.control<'comfortable' | 'compact'>('comfortable'),
  });

  async ngOnInit(): Promise<void> {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.store.clearSaveSuccess();
    });

    await this.store.load();
    const prefs = this.store.preferences();
    if (prefs) {
      this.form.patchValue(prefs, { emitEvent: false });
    }
  }

  protected async save(): Promise<void> {
    await this.store.save(this.form.getRawValue());
    const prefs = this.store.preferences();
    if (prefs) {
      this.form.patchValue(prefs, { emitEvent: false });
    }
    if (this.store.saveSucceeded()) {
      this.notify.success('Preferences saved.');
    }
  }
}
