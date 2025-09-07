import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconType } from '@stt/shared/icon/model';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'stt-icon-button',
  imports: [MatIcon, MatFabButton],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButton {
  readonly icon = input.required<IconType>();

  readonly clicked = output();

  click(): void {
    this.clicked.emit();
  }
}
