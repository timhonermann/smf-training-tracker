import { Route } from '@angular/router';
import { Shell } from '@stt/features/shell/feature';
import { featureRoutes } from '@stt/shared/routing/util';

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
        path: '**',
        redirectTo: featureRoutes.DASHBOARD,
      },
    ],
  },
];
