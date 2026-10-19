import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Tile } from '../tile/tile';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stt-training-requirement-metric-tile',
  imports: [Tile, MatIcon],
  templateUrl: './training-requirement-metric-tile.component.html',
  styleUrl: './training-requirement-metric-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRequirementMetricTile {
  readonly totalRequirementReached = input.required<number>();
  readonly totalRequirementAlmostReached = input.required<number>();

  readonly clicked = output();
}
