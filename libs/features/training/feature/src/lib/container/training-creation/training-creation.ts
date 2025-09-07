import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { featureRoutes } from '@stt/shared/routing/model';
import { BackButton } from '@stt/shared/button/ui';

@Component({
  selector: 'stt-training-creation',
  imports: [BackButton],
  templateUrl: './training-creation.html',
  styleUrl: './training-creation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCreation {
  readonly backLink = signal(`/${featureRoutes.TRAINING}`).asReadonly();
}
