import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItemData } from '@stt/features/shell/model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stt-menu-item',
  imports: [RouterLink, MatIcon, RouterLinkActive],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItem {
  readonly item = input.required<MenuItemData>();
}
