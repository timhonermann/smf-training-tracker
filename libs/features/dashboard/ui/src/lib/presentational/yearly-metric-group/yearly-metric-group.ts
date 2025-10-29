import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MetricTile } from '../metric-tile/metric-tile';
import { TrainingRequirementMetricTile } from '../training-requirement-metric-tile/training-requirement-metric-tile.component';

@Component({
  selector: 'stt-yearly-metric-group',
  imports: [MetricTile, TrainingRequirementMetricTile],
  templateUrl: './yearly-metric-group.html',
  styleUrl: './yearly-metric-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyMetricGroup {
  readonly year = input.required<number>();
  readonly totalRequirementMet = input.required<number>();
  readonly totalRequirementAlmostMet = input.required<number>();
  readonly averageParticipants = input.required<number>();
  readonly totalTrainings = input.required<number>();
}
