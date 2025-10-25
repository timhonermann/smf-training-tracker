import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tile } from '../tile/tile';

@Component({
  selector: 'stt-metric-tile',
  imports: [Tile],
  templateUrl: './metric-tile.html',
  styleUrl: './metric-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricTile {
  readonly title = input.required<string>();

  readonly value = input.required<number>();
}
