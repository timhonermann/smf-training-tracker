import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList } from '@angular/material/list';
import { PersonStore } from '@stt/features/person/domain';
import { PersonListItem } from '@stt/features/person/ui';
import { Button } from '@stt/shared/button/ui';
import { PageTitle, Tile } from '@stt/shared/page/ui';
import { PageLayout } from '@stt/shared/page/layout';

@Component({
  selector: 'stt-person-list',
  imports: [
    PersonListItem,
    Button,
    MatList,
    MatDivider,
    PageTitle,
    Tile,
    PageLayout,
  ],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonList {
  readonly store = inject(PersonStore);
}
