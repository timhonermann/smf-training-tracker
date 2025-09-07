import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { BackButton, Button } from '@stt/shared/button/ui';
import { featureRoutes } from '@stt/shared/routing/model';
import { TrainingLocationStore } from '@stt/features/training/domain';
import { TrainingLocationCreationData } from '@stt/features/training/model';

@Component({
  selector: 'stt-training-location-creation',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    BackButton,
    Button,
  ],
  templateUrl: './training-location-creation.html',
  styleUrl: './training-location-creation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLocationCreation {
  readonly #store = inject(TrainingLocationStore);

  readonly nameControl = new FormControl<string>('', [Validators.required]);

  readonly backLink = signal(
    `/${featureRoutes.TRAINING}/location`
  ).asReadonly();

  create(): void {
    const creationData: TrainingLocationCreationData = {
      name: this.nameControl.value ?? '',
    };

    this.#store.create(creationData);
  }
}
