import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'stt-tile',
  imports: [],
  templateUrl: './tile.html',
  styleUrl: './tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.clickable]': 'isClickable()',
  },
})
export class Tile {
  readonly isClickable = input(false);
}
