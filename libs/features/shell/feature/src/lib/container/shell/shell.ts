import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '@stt/features/shell/ui';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'stt-shell',
  imports: [Header, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
