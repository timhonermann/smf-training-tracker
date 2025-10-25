import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'stt-tile',
  imports: [],
  templateUrl: './tile.html',
  styleUrl: './tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tile {}
