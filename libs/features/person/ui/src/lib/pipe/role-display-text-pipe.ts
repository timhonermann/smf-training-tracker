import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '@stt/shared/person/model';

const ROLE_DISPLAY_TEXT_MAP: Record<Role, string> = {
  MEMBER: 'Member',
  DECOY: 'Decoy',
  RG_LEAD: 'RG Lead',
};

@Pipe({
  name: 'roleDisplayText',
})
export class RoleDisplayTextPipe implements PipeTransform {
  transform(role: Role): string {
    return ROLE_DISPLAY_TEXT_MAP[role];
  }
}
