import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  PersonTrainingRequirementMetric,
  trainingRequirementStatus,
} from '@stt/features/dashboard/model';

@Component({
  selector: 'stt-person',
  imports: [],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.met]':
      'person().trainingRequirementStatus === trainingRequirementStatus.MET',
    '[class.almost-met]':
      'person().trainingRequirementStatus === trainingRequirementStatus.ALMOST_MET',
    '[class.unmet]':
      'person().trainingRequirementStatus === trainingRequirementStatus.UNMET',
  },
})
export class Person {
  readonly person = input.required<PersonTrainingRequirementMetric>();
  protected readonly trainingRequirementStatus = trainingRequirementStatus;
}
