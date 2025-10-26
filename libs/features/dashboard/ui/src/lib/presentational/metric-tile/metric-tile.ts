import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tile } from '../tile/tile';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'stt-metric-tile',
  imports: [Tile, DecimalPipe],
  templateUrl: './metric-tile.html',
  styleUrl: './metric-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricTile {
  readonly title = input.required<string>();

  readonly value = input.required<number>();
}
