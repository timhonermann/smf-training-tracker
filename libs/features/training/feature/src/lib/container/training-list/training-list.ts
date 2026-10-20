import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrainingStore } from '@stt/features/training/domain';
import {
  TrainingListActions,
  TrainingListItem,
} from '@stt/features/training/ui';
import { MatAccordion } from '@angular/material/expansion';
import { PageTitle } from '@stt/shared/page/ui';

@Component({
  selector: 'stt-training-list',
  imports: [TrainingListItem, MatAccordion, TrainingListActions, PageTitle],
  templateUrl: './training-list.html',
  styleUrl: './training-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingList {
  readonly store = inject(TrainingStore);
}
