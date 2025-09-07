import { Role } from '@stt/features/person/model';

const ROLE_DISPLAY_TEXT_MAP: Record<Role, string> = {
  MEMBER: 'Member',
  DECOY: 'Decoy',
  RG_LEAD: 'RG Lead',
};

export function getPersonRoleDisplayText(role: Role): string {
  return ROLE_DISPLAY_TEXT_MAP[role];
}
