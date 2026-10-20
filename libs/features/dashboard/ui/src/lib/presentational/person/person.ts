import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  PersonTrainingRequirementMetric,
  trainingRequirementStatus,
} from '@stt/features/dashboard/model';

@Component({
  selector: 'stt-person',
  imports: [MatIcon],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.reached]':
      'person().trainingRequirementStatus === trainingRequirementStatus.REACHED',
    '[class.almost-reached]':
      'person().trainingRequirementStatus === trainingRequirementStatus.ALMOST_REACHED',
    '[class.not-reached]':
      'person().trainingRequirementStatus === trainingRequirementStatus.NOT_REACHED',
  },
})
export class Person {
  readonly person = input.required<PersonTrainingRequirementMetric>();
  protected readonly trainingRequirementStatus = trainingRequirementStatus;
}
