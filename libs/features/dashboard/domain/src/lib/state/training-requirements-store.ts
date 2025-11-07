import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import {
  PersonTrainingRequirementMetric,
  yearReference,
  YearReference,
} from '@stt/features/dashboard/model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
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
      _filteredPeople().sort((a, b) => b.totalTrainings - a.totalTrainings),
    );

    return {
      peopleSortedByTrainings,
    };
  }),
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

    setSearchValue: (searchValue: string | null) =>
      patchState(store, { searchValue }),
  })),
  withHooks({
    onInit: (store) => {
      store._load(yearReference.CURRENT);
    },
  }),
);
