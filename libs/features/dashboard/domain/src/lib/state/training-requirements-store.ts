import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import {
  PersonTrainingRequirementMetric,
  YearReference,
  YearReferenceParam,
} from '@stt/features/dashboard/model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, map, pipe } from 'rxjs';
import { computed, inject } from '@angular/core';
import { MetricsApiClient } from '../service/metrics-api-client';
import { tapResponse } from '@ngrx/operators';

type TrainingRequirementsState = {
  searchValue: string | null;
};

const initialState: TrainingRequirementsState = {
  searchValue: null,
};

export const TrainingRequirementsStore = signalStore(
  withState<TrainingRequirementsState>(initialState),
  withEntities<PersonTrainingRequirementMetric>(),
  withComputed((store) => {
    const _filteredPeople = computed(() => {
      const searchValue = store.searchValue()?.toLowerCase();
      const people = store.entities();

      if (!searchValue) {
        return people;
      }

      return people.filter(
        (p) =>
          p.firstName.toLowerCase().includes(searchValue) ||
          p.lastName.toLowerCase().includes(searchValue),
      );
    });

    const peopleSortedByTrainings = computed(() =>
      _filteredPeople().sort((a, b) => {
        const diff = b.totalTrainings - a.totalTrainings;

        if (diff !== 0) {
          return diff;
        }

        return a.firstName.localeCompare(b.firstName);
      }),
    );

    return {
      peopleSortedByTrainings,
    };
  }),
  withMethods((store, metricsApiClient = inject(MetricsApiClient)) => ({
    load: rxMethod<YearReferenceParam | undefined>(
      pipe(
        filter(Boolean),
        map(yearReferenceParamToYearReference),
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
    ),

    setSearchValue: (searchValue: string | null) =>
      patchState(store, { searchValue }),
  })),
);

const YEAR_REFERENCE_PARAM_YEAR_REFERENCE_MAP: Record<
  YearReferenceParam,
  YearReference
> = {
  current: 'CURRENT',
  previous: 'PREVIOUS',
};

const yearReferenceParamToYearReference = (
  yearReferenceParam: YearReferenceParam,
): YearReference => YEAR_REFERENCE_PARAM_YEAR_REFERENCE_MAP[yearReferenceParam];
