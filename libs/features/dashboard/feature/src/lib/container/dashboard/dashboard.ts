import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SummaryMetricStore } from '@stt/features/dashboard/domain';
import { YearlyMetricGroup } from '@stt/features/dashboard/ui';

@Component({
  selector: 'stt-dashboard',
  imports: [YearlyMetricGroup],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SummaryMetricStore],
})
export class Dashboard {
  readonly store = inject(SummaryMetricStore);
}
