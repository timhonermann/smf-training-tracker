import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrainingStore } from '@stt/features/training/domain';
import {
  TrainingListActions,
  TrainingListItem,
} from '@stt/features/training/ui';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'stt-training-list',
  imports: [TrainingListItem, MatAccordion, TrainingListActions],
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
