import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonStore } from '@stt/features/person/domain';
import { PersonListItem } from '@stt/features/person/ui';
import { Button } from '@stt/shared/button/ui';

@Component({
  selector: 'stt-person-list',
  imports: [PersonListItem, Button],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonList {
  private readonly store = inject(PersonStore);

  readonly people = this.store.entities;

  navigateToPersonCreation(): void {
    this.store.navigateToPersonCreation();
  }
}
