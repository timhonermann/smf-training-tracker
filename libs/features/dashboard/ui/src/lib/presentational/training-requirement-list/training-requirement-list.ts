import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonTrainingRequirementMetric } from '@stt/features/dashboard/model';
import { Person } from '../person/person';

@Component({
  selector: 'stt-training-requirement-list',
  imports: [Person],
  templateUrl: './training-requirement-list.html',
  styleUrl: './training-requirement-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRequirementList {
  readonly people = input.required<PersonTrainingRequirementMetric[]>();
}
