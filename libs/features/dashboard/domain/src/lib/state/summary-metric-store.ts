import { SummaryMetric } from '@stt/features/dashboard/model';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { MetricsApiClient } from '../service/metrics-api-client';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type SummaryMetricState = SummaryMetric;

const initialState: SummaryMetricState = {
  currentYear: {
    year: 0,
    totalPeopleTrainingRequirementMet: 0,
    totalPeopleTrainingRequirementAlmostAlmostMet: 0,
    totalTrainings: 0,
    averageParticipants: 0,
  },
  previousYear: {
    year: 0,
    totalPeopleTrainingRequirementMet: 0,
    totalPeopleTrainingRequirementAlmostAlmostMet: 0,
    totalTrainings: 0,
    averageParticipants: 0,
  },
};

export const SummaryMetricStore = signalStore(
  withState<SummaryMetricState>(initialState),
  withMethods((store, metricsApiClient = inject(MetricsApiClient)) => ({
    _load: rxMethod<void>(
      exhaustMap(() =>
        metricsApiClient.getSummary().pipe(
          tapResponse({
            next: (summaryMetric) => patchState(store, summaryMetric),
            error: () => console.error('Error loading summary metric'),
          }),
        ),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => {
      store._load();
    },
  }),
);
