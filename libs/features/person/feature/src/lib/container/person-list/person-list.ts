import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PersonStore } from '@stt/features/person/domain';
import { PersonListItem } from '@stt/features/person/ui';

@Component({
  selector: 'stt-person-list',
  imports: [MatButton, PersonListItem],
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
