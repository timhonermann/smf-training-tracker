import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Role } from '@stt/shared/person/model';
import { RoleDisplayTextPipe } from '../../pipe/role-display-text-pipe';

@Component({
  selector: 'stt-person-role-tag',
  imports: [RoleDisplayTextPipe],
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
}
