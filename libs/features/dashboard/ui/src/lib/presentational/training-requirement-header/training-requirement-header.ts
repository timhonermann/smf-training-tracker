import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BackButton } from '@stt/shared/button/ui';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { featureRoutes } from '@stt/shared/routing/model';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'stt-training-requirement-header',
  imports: [BackButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './training-requirement-header.html',
  styleUrl: './training-requirement-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRequirementHeader {
  readonly backLink = signal(`/${featureRoutes.DASHBOARD}`).asReadonly();

  readonly searchControl = new FormControl('');

  readonly searchInputChanged = outputFromObservable(
    this.searchControl.valueChanges.pipe(debounceTime(300)),
  );
}
