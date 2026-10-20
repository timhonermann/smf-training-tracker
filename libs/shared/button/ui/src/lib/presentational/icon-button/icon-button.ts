import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconType } from '@stt/shared/icon/model';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonAppearance } from '@angular/material/button';

@Component({
  selector: 'stt-icon-button',
  imports: [MatIcon, MatButton],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButton {
  readonly icon = input.required<IconType>();
  readonly appearance = input<MatButtonAppearance>('filled');

  readonly clicked = output();
}
