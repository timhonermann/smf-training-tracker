import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItemData } from '@stt/features/shell/model';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'stt-menu',
  imports: [MenuItem],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly menuItems = input.required<MenuItemData[]>();
}
