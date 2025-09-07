import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'stt-back-button',
  imports: [MatFabButton, MatIcon, RouterLink],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButton {
  readonly link = input.required<string>();
}
