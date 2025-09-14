import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { featureRoutes } from '@stt/shared/routing/model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { TrainingApiClient } from '../service/training-api-client';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import {
  TrainingCreationData,
  TrainingData,
} from '@stt/features/training/model';
import { tapResponse } from '@ngrx/operators';
import { PersonData } from '@stt/shared/person/model';
import { PersonApiClient } from '@stt/shared/person/domain';

type TrainingState = {
  people: PersonData[];
  selectedPersonIds: string[];
};

const initialState: TrainingState = {
  people: [],
  selectedPersonIds: [],
};

export const TrainingStore = signalStore(
  withState<TrainingState>(initialState),
  withEntities<TrainingData>(),
  withMethods(
    (
      store,
      trainingApiClient = inject(TrainingApiClient),
      personApiClient = inject(PersonApiClient),
      router = inject(Router)
    ) => ({
      _loadAll: rxMethod<void>(
        exhaustMap(() =>
          trainingApiClient.getAll().pipe(
            tapResponse({
              next: (trainings) => patchState(store, setAllEntities(trainings)),
              error: () => console.error('Error loading training'),
            })
          )
        )
      ),

      _loadAllPeople: rxMethod<void>(
        exhaustMap(() =>
          personApiClient.getAll().pipe(
            tapResponse({
              next: (people) => patchState(store, { people }),
              error: () => console.error('Error loading people'),
            })
          )
        )
      ),

      create: rxMethod<TrainingCreationData>(
        exhaustMap((creationData) =>
          trainingApiClient.create(creationData).pipe(
            tapResponse({
              next: (training) => {
                patchState(store, setEntity(training), {
                  selectedPersonIds: [],
                });
                router.navigate([featureRoutes.TRAINING]);
              },
              error: () => console.error('Error creating training'),
            })
          )
        )
      ),

      setSelectedPersonIds: (selectedPersonIds: string[]) =>
        patchState(store, { selectedPersonIds }),

      navigateToTrainingLocations: () =>
        router.navigate([featureRoutes.TRAINING, 'location']),

      navigateToTrainingCreation: () =>
        router.navigate([featureRoutes.TRAINING, 'create']),
    })
  ),
  withMethods((store) => ({
    selectedPeople: computed(() => {
      const people = store.people();
      const ids = new Set(store.selectedPersonIds());

      return people.filter((p) => ids.has(p.id));
    }),
  })),
  withHooks({
    onInit: (store) => {
      store._loadAll();
      store._loadAllPeople();
    },
  })
);
