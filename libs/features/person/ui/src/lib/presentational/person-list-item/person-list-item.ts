import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonRoleTag } from '../person-role-tag/person-role-tag';
import { PersonData } from '@stt/shared/person/model';

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
