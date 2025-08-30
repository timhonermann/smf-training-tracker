import { IconType } from '@stt/shared/icon/model';
import { featureRoutes } from '@stt/shared/routing/model';

export type MenuItemData = {
  path: (typeof featureRoutes)[keyof typeof featureRoutes];
  label: string;
  icon: IconType;
};
