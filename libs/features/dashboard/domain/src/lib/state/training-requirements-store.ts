import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import {
  PersonTrainingRequirementMetric,
  yearReference,
  YearReference,
} from '@stt/features/dashboard/model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { inject } from '@angular/core';
import { MetricsApiClient } from '../service/metrics-api-client';
import { tapResponse } from '@ngrx/operators';

export const TrainingRequirementsStore = signalStore(
  withEntities<PersonTrainingRequirementMetric>(),
  withMethods((store, metricsApiClient = inject(MetricsApiClient)) => ({
    _load: rxMethod<YearReference>(
      exhaustMap((yearReference) =>
        metricsApiClient.getTrainingRequirements(yearReference).pipe(
          tapResponse({
            next: (personTrainingRequirementMetrics) =>
              patchState(
                store,
                setAllEntities(personTrainingRequirementMetrics),
              ),
            error: () =>
              console.error('Error loading training requirement metrics'),
          }),
        ),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => {
      store._load(yearReference.CURRENT);
    },
  }),
);
