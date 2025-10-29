import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { IconButton } from '@stt/shared/button/ui';

@Component({
  selector: 'stt-training-list-actions',
  imports: [IconButton],
  templateUrl: './training-list-actions.component.html',
  styleUrl: './training-list-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingListActions {
  readonly createTrainingClicked = output();
  readonly trainingLocationClicked = output();
}
