export const icons = [
  'add',
  'delete',
  'settings',
  'dashboard',
  'location',
  'paw',
  'person',
] as const;

export type IconType = (typeof icons)[number];
