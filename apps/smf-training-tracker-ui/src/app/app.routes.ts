import { Route } from '@angular/router';
import { Shell } from '@stt/features/shell/feature';
import { featureRoutes } from '@stt/shared/routing/model';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: featureRoutes.DASHBOARD,
        loadComponent: () =>
          import('@stt/features/dashboard/feature').then((c) => c.Dashboard),
      },
      {
        path: featureRoutes.TRAINING,
        loadComponent: () =>
          import('@stt/features/training/feature').then((c) => c.Training),
      },
      {
        path: featureRoutes.PERSON,
        loadComponent: () =>
          import('@stt/features/person/feature').then((c) => c.Person),
      },
      {
        path: featureRoutes.SETTINGS,
        loadComponent: () =>
          import('@stt/features/settings/feature').then((c) => c.Settings),
      },
      {
        path: '**',
        redirectTo: featureRoutes.DASHBOARD,
      },
    ],
  },
];
