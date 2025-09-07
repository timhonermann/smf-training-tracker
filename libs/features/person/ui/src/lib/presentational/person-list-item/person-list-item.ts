import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonData } from '@stt/features/person/model';
import { PersonRoleTag } from '../person-role-tag/person-role-tag';

@Component({
  selector: 'stt-person-list-item',
  imports: [PersonRoleTag],
  templateUrl: './person-list-item.html',
  styleUrl: './person-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListItem {
  readonly personData = input.required<PersonData>();
}
