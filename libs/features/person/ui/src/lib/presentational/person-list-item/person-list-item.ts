import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  MatListItem,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { PersonRoleTag } from '../person-role-tag/person-role-tag';
import { PersonData } from '@stt/shared/person/model';

@Component({
  selector: 'stt-person-list-item',
  imports: [PersonRoleTag, MatListItem, MatListItemMeta, MatListItemTitle],
  templateUrl: './person-list-item.html',
  styleUrl: './person-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListItem {
  readonly personData = input.required<PersonData>();
}
