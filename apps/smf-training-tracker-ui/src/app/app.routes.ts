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
        loadChildren: () =>
          import('@stt/features/training/feature').then((f) => f.routes),
      },
      {
        path: featureRoutes.PERSON,
        loadChildren: () =>
          import('@stt/features/person/feature').then((f) => f.routes),
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
