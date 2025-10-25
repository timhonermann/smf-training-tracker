import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SummaryMetricStore } from '@stt/features/dashboard/domain';
import {
  MetricTile,
  TrainingRequirementMetricTile,
} from '@stt/features/dashboard/ui';

@Component({
  selector: 'stt-dashboard',
  imports: [TrainingRequirementMetricTile, MetricTile],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SummaryMetricStore],
})
export class Dashboard {
  readonly store = inject(SummaryMetricStore);
}
