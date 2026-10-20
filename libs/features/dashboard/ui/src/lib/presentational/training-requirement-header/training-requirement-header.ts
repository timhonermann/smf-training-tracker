import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BackButton } from '@stt/shared/button/ui';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { featureRoutes } from '@stt/shared/routing/model';
import { PageTitle } from '@stt/shared/page/ui';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'stt-training-requirement-header',
  imports: [
    BackButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    PageTitle,
    ReactiveFormsModule,
  ],
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
