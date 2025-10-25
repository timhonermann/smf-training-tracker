import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tile } from '../tile/tile';

@Component({
  selector: 'stt-training-requirement-metric-tile',
  imports: [Tile],
  templateUrl: './training-requirement-metric-tile.component.html',
  styleUrl: './training-requirement-metric-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRequirementMetricTile {
  readonly totalRequirementMet = input.required<number>();
  readonly totalRequirementAlmostMet = input.required<number>();
}
