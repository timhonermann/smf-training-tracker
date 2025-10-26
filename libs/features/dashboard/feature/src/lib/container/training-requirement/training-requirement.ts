import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrainingRequirementsStore } from '@stt/features/dashboard/domain';

@Component({
  selector: 'stt-training-requirement',
  imports: [],
  templateUrl: './training-requirement.html',
  styleUrl: './training-requirement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TrainingRequirementsStore],
})
export class TrainingRequirement {
  readonly store = inject(TrainingRequirementsStore);
}
