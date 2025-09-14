import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconButton } from '@stt/shared/button/ui';
import { TrainingStore } from '@stt/features/training/domain';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'stt-training-list',
  imports: [IconButton, DatePipe],
  templateUrl: './training-list.html',
  styleUrl: './training-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingList {
  readonly #store = inject(TrainingStore);

  readonly trainings = this.#store.entities;

  navigateToTrainingLocations(): void {
    this.#store.navigateToTrainingLocations();
  }

  navigateToTrainingCreation(): void {
    this.#store.navigateToTrainingCreation();
  }
}
