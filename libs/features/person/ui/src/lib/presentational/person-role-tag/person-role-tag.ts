import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Role } from '@stt/features/person/model';
import { getPersonRoleDisplayText } from '@stt/features/person/util';

@Component({
  selector: 'stt-person-role-tag',
  imports: [],
  templateUrl: './person-role-tag.html',
  styleUrl: './person-role-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.member]': 'role() === "MEMBER"',
    '[class.decoy]': 'role() === "DECOY"',
    '[class.rg-lead]': 'role() === "RG_LEAD"',
  },
})
export class PersonRoleTag {
  readonly role = input.required<Role>();

  protected readonly roleDisplayText = computed(() =>
    getPersonRoleDisplayText(this.role())
  );
}
