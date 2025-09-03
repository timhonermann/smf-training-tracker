export const role = {
  RG_LEITER: 'RG_LEITER',
  SCHUTZDIENSTHELFER: 'SCHUTZDIENSTHELFER',
  MITGLIED: 'MITGLIED'
} as const

export type Role = (typeof role)[keyof typeof role];

export type PersonData = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role
}
