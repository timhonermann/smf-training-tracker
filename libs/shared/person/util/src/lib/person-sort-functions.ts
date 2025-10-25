import { PersonData, role, Role } from '@stt/shared/person/model';

const ROLE_PRIORITY: Record<Role, number> = {
  [role.RG_LEAD]: 0,
  [role.DECOY]: 1,
  [role.MEMBER]: 2,
};

export function sortPeopleByRoleThenName(people: PersonData[]) {
  return [...people].sort((a, b) => {
    const diff = ROLE_PRIORITY[a.role] - ROLE_PRIORITY[b.role];

    if (diff !== 0) {
      return diff;
    }

    return a.firstName.localeCompare(b.firstName);
  });
}
