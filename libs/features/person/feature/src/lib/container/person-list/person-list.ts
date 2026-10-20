import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList } from '@angular/material/list';
import { PersonStore } from '@stt/features/person/domain';
import { PersonListItem } from '@stt/features/person/ui';
import { Button } from '@stt/shared/button/ui';
import { PageTitle, Tile } from '@stt/shared/page/ui';

@Component({
  selector: 'stt-person-list',
  imports: [PersonListItem, Button, MatList, MatDivider, PageTitle, Tile],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonList {
  readonly store = inject(PersonStore);
}
