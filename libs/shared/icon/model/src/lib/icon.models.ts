export const icons = [
  'add',
  'delete',
  'settings',
  'dashboard',
  'location',
  'paw',
  'person',
  'arrow_back',
  'group',
] as const;

export type IconType = (typeof icons)[number];
