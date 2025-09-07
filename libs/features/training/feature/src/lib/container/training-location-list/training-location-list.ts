import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BackButton, Button } from '@stt/shared/button/ui';
import { TrainingLocationStore } from '@stt/features/training/domain';
import { featureRoutes } from '@stt/shared/routing/model';

@Component({
  selector: 'stt-training-location-list',
  imports: [Button, BackButton],
  templateUrl: './training-location-list.html',
  styleUrl: './training-location-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLocationList {
  readonly #store = inject(TrainingLocationStore);

  readonly locations = this.#store.entities;

  readonly backLink = signal(`/${featureRoutes.TRAINING}`).asReadonly();

  navigateToTrainingLocationCreation(): void {
    this.#store.navigateToTrainingLocationCreation();
  }
}
