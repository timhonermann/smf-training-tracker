import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MetricTile } from '../metric-tile/metric-tile';
import { TrainingRequirementMetricTile } from '../training-requirement-metric-tile/training-requirement-metric-tile.component';

@Component({
  selector: 'stt-yearly-metric-group',
  imports: [MatIcon, MetricTile, TrainingRequirementMetricTile],
  templateUrl: './yearly-metric-group.html',
  styleUrl: './yearly-metric-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyMetricGroup {
  readonly year = input.required<number>();
  readonly totalRequirementReached = input.required<number>();
  readonly totalRequirementAlmostReached = input.required<number>();
  readonly averageParticipants = input.required<number>();
  readonly totalTrainings = input.required<number>();
  readonly isCurrentYear = input(false);

  readonly clicked = output();

  /**
   * The calendar year the metrics cover, as the backend defines it, in a fixed
   * dd.MM.yyyy format regardless of the browser locale.
   */
  readonly dateRange = computed(
    () => `01.01.${this.year()} – 31.12.${this.year()}`,
  );
}
