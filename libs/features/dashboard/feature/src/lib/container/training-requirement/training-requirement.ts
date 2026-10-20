import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TrainingRequirementsStore } from '@stt/features/dashboard/domain';
import {
  TrainingRequirementHeader,
  TrainingRequirementList,
  TrainingRequirementTitle
} from '@stt/features/dashboard/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { YearReferenceParam } from '@stt/features/dashboard/model';
import { Tile } from '@stt/shared/page/ui';
import { PageLayout } from '@stt/shared/page/layout';

@Component({
  selector: 'stt-training-requirement',
  imports: [
    ReactiveFormsModule,
    TrainingRequirementHeader,
    TrainingRequirementTitle,
    TrainingRequirementList,
    Tile,
    PageLayout,
  ],
  templateUrl: './training-requirement.html',
  styleUrl: './training-requirement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TrainingRequirementsStore],
})
export class TrainingRequirement {
  readonly store = inject(TrainingRequirementsStore);

  readonly year = input<YearReferenceParam>();

  constructor() {
    this.store.load(this.year);
  }
}
