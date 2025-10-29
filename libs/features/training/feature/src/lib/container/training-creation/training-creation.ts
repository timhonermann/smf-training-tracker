import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { featureRoutes } from '@stt/shared/routing/model';
import { BackButton } from '@stt/shared/button/ui';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TrainingLocationStore,
  TrainingStore,
} from '@stt/features/training/domain';
import { TrainingCreationForm } from '@stt/features/training/ui';

@Component({
  selector: 'stt-training-creation',
  imports: [BackButton, ReactiveFormsModule, TrainingCreationForm],
  templateUrl: './training-creation.html',
  styleUrl: './training-creation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCreation {
  readonly trainingStore = inject(TrainingStore);
  readonly locationStore = inject(TrainingLocationStore);

  readonly backLink = signal(`/${featureRoutes.TRAINING}`).asReadonly();
}
