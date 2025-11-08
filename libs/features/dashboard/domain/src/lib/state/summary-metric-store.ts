import {
  SummaryMetric,
  YEAR_REFERENCE_PARAM_NAME,
  yearReference,
  YearReference,
  yearReferenceParam,
} from '@stt/features/dashboard/model';
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
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  withMethods(
    (
      store,
      metricsApiClient = inject(MetricsApiClient),
      router = inject(Router),
      activatedRoute = inject(ActivatedRoute),
    ) => {
      const _load = rxMethod<void>(
        exhaustMap(() =>
          metricsApiClient.getSummary().pipe(
            tapResponse({
              next: (summaryMetric) => patchState(store, summaryMetric),
              error: () => console.error('Error loading summary metric'),
            }),
          ),
        ),
      );

      const _navigateToTrainingRequirements = (year: YearReference) => {
        const queryParams: Params = {
          [YEAR_REFERENCE_PARAM_NAME]: yearReferenceParam[year],
        };

        return router.navigate(['training-requirement'], {
          queryParams,
          relativeTo: activatedRoute,
        });
      };

      const navigateToTrainingRequirementsCurrentYear = () => {
        return _navigateToTrainingRequirements(yearReference.CURRENT);
      };

      const navigateToTrainingRequirementsPreviousYear = () => {
        return _navigateToTrainingRequirements(yearReference.PREVIOUS);
      };

      return {
        _load,
        navigateToTrainingRequirementsCurrentYear,
        navigateToTrainingRequirementsPreviousYear,
      };
    },
  ),
  withHooks({
    onInit: (store) => {
      store._load();
    },
  }),
);
