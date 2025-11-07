import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrainingRequirementsStore } from '@stt/features/dashboard/domain';
import {
  TrainingRequirementHeader,
  TrainingRequirementList,
  TrainingRequirementTitle
} from '@stt/features/dashboard/ui';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stt-training-requirement',
  imports: [
    ReactiveFormsModule,
    TrainingRequirementHeader,
    TrainingRequirementTitle,
    TrainingRequirementList,
  ],
  templateUrl: './training-requirement.html',
  styleUrl: './training-requirement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TrainingRequirementsStore],
})
export class TrainingRequirement {
  readonly store = inject(TrainingRequirementsStore);
}
