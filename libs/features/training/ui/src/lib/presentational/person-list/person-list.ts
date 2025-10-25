import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonData } from '@stt/shared/person/model';
import { PersonListItem } from '../person-list-item/person-list-item';

@Component({
  selector: 'stt-person-list',
  imports: [PersonListItem],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonList {
  readonly people = input.required<PersonData[]>();
}
