export const role = {
  RG_LEAD: 'RG_LEAD',
  DECOY: 'DECOY',
  MEMBER: 'MEMBER',
} as const;

export type Role = (typeof role)[keyof typeof role];

export type PersonData = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
};

export type PersonCreationData = Omit<PersonData, 'id'>;
