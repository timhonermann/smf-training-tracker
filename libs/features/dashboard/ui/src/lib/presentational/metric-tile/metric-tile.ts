import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tile } from '../tile/tile';
import { DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { IconType } from '@stt/shared/icon/model';

@Component({
  selector: 'stt-metric-tile',
  imports: [Tile, DecimalPipe, MatIcon],
  templateUrl: './metric-tile.html',
  styleUrl: './metric-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricTile {
  readonly title = input.required<string>();
  readonly icon = input.required<IconType>();
  readonly value = input.required<number>();
  readonly description = input<string>();
}
