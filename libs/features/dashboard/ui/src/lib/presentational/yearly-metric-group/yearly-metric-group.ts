import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { YearlyMetric } from '@stt/features/dashboard/model';
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
  readonly yearlyMetric = input.required<YearlyMetric>();
  readonly isCurrentYear = input(false);

  readonly clicked = output();

  /**
   * The calendar year the metrics cover, as the backend defines it, in a fixed
   * dd.MM.yyyy format regardless of the browser locale.
   */
  readonly dateRange = computed(() => {
    const year = this.yearlyMetric().year;
    return `01.01.${year} – 31.12.${year}`;
  });
}
