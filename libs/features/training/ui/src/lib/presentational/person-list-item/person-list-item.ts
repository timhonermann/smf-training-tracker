import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonData, role } from '@stt/shared/person/model';
import { Bullet } from '../bullet/bullet';

@Component({
  selector: 'stt-person-list-item',
  imports: [Bullet],
  templateUrl: './person-list-item.html',
  styleUrl: './person-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListItem {
  readonly item = input.required<PersonData>();
  readonly role = role;
}
