import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header, Menu } from '@stt/features/shell/ui';
import { RouterOutlet } from '@angular/router';
import { MenuItemData } from '@stt/features/shell/model';
import { featureRoutes } from '@stt/shared/routing/model';

@Component({
  selector: 'stt-shell',
  imports: [Header, RouterOutlet, Menu],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  readonly menuItems: MenuItemData[] = [
    {
      path: featureRoutes.DASHBOARD,
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      path: featureRoutes.TRAINING,
      label: 'Training',
      icon: 'paw',
    },
    {
      path: featureRoutes.PERSON,
      label: 'People',
      icon: 'person',
    },
  ];
}
